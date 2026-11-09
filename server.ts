import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { db, Product, Order, User } from './server/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Direct ZIP Download endpoint
app.get('/api/download-zip', (_req: Request, res: Response) => {
  const zipPath = path.resolve(__dirname, 'public', '19BeesKicks-complete-project.zip');
  res.download(zipPath, '19BeesKicks-complete-project.zip', (err) => {
    if (err) {
      console.error('Error downloading zip:', err);
      res.status(500).json({ success: false, message: 'Failed to download zip' });
    }
  });
});

// Products List with Search, Filter & Sort
app.get('/api/products', (req: Request, res: Response) => {
  try {
    let products = db.getProducts();
    const { category, search, minPrice, maxPrice, size, sort, inStock, collection } = req.query;

    if (category && typeof category === 'string' && category !== 'all') {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (collection && typeof collection === 'string') {
      if (collection === 'bestsellers') {
        products = products.filter(p => p.isBestSeller);
      } else if (collection === 'newarrivals') {
        products = products.filter(p => p.isNewArrival);
      }
    }

    if (search && typeof search === 'string') {
      const q = search.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.colors.some(c => c.toLowerCase().includes(q))
      );
    }

    if (minPrice) {
      const min = parseFloat(minPrice as string);
      if (!isNaN(min)) products = products.filter(p => p.price >= min);
    }

    if (maxPrice) {
      const max = parseFloat(maxPrice as string);
      if (!isNaN(max)) products = products.filter(p => p.price <= max);
    }

    if (size) {
      const s = parseInt(size as string, 10);
      if (!isNaN(s)) products = products.filter(p => p.sizes.includes(s));
    }

    if (inStock === 'true') {
      products = products.filter(p => p.inStock && p.stockCount > 0);
    }

    // Sorting
    if (sort === 'price_asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
      products.sort((a, b) => b.price - a.price);
    } else if (sort === 'popularity') {
      products.sort((a, b) => b.reviewCount - a.reviewCount);
    } else {
      // Default: Latest
      products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    res.json({ success: true, count: products.length, products });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Single Product
app.get('/api/products/:id', (req: Request, res: Response) => {
  try {
    const product = db.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Create Product
app.post('/api/products', (req: Request, res: Response) => {
  try {
    const { name, category, price, originalPrice, description, details, images, sizes, colors, inStock, stockCount, isBestSeller, isNewArrival } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ success: false, message: 'Missing required product fields' });
    }

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      category,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      description: description || '',
      details: Array.isArray(details) ? details : ['Handcrafted premium leather', 'Cushioned luxury footbed'],
      images: Array.isArray(images) && images.length > 0 ? images : ['/src/assets/images/hero_luxury_sneaker_1794183121618.jpg'],
      sizes: Array.isArray(sizes) && sizes.length > 0 ? sizes.map(Number) : [40, 41, 42, 43, 44],
      colors: Array.isArray(colors) && colors.length > 0 ? colors : ['Black', 'Off-White'],
      inStock: inStock !== undefined ? Boolean(inStock) : true,
      stockCount: stockCount ? Number(stockCount) : 10,
      isBestSeller: Boolean(isBestSeller),
      isNewArrival: Boolean(isNewArrival),
      rating: 5.0,
      reviewCount: 0,
      createdAt: new Date().toISOString()
    };

    const saved = db.addProduct(newProduct);
    res.status(201).json({ success: true, product: saved });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Update Product
app.put('/api/products/:id', (req: Request, res: Response) => {
  try {
    const updated = db.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Delete Product
app.delete('/api/products/:id', (req: Request, res: Response) => {
  try {
    const deleted = db.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Auth: Register
app.post('/api/auth/register', (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, address } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }

    const existing = db.getUserByEmail(email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      phone: phone || '',
      passwordHash: password, // In production this would use bcrypt
      role: 'customer',
      address: address || undefined,
      createdAt: new Date().toISOString()
    };

    db.createUser(newUser);
    const { passwordHash, ...safeUser } = newUser;
    res.status(201).json({ success: true, user: safeUser });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Auth: Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = db.getUserByEmail(email);
    if (!user || user.passwordHash !== password) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const { passwordHash, ...safeUser } = user;
    res.json({ success: true, user: safeUser });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Orders: Create Order
app.post('/api/orders', (req: Request, res: Response) => {
  try {
    const { customer, items, paymentMethod, paymentDetails, userId } = req.body;

    if (!customer?.fullName || !customer?.phone || !customer?.address || !customer?.city) {
      return res.status(400).json({ success: false, message: 'Complete delivery details are required' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order must contain at least one item' });
    }

    // Recheck stock & calculate total server-side
    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const prod = db.getProductById(item.productId);
      if (!prod) {
        return res.status(400).json({ success: false, message: `Product ${item.productName || item.productId} no longer exists` });
      }
      if (prod.stockCount < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${prod.name}` });
      }
      const itemTotal = prod.price * item.quantity;
      subtotal += itemTotal;
      validatedItems.push({
        productId: prod.id,
        productName: prod.name,
        price: prod.price,
        size: item.size || 42,
        color: item.color || prod.colors[0],
        quantity: item.quantity,
        image: prod.images[0]
      });
    }

    // Free delivery over 15,000 PKR, else 250 PKR standard shipping in Pakistan
    const shipping = subtotal >= 15000 ? 0 : 250;
    const grandTotal = subtotal + shipping;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `19BK-${new Date().getFullYear()}-${randomSuffix}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      userId: userId || undefined,
      customer: {
        fullName: customer.fullName,
        email: customer.email || 'customer@19beeskicks.com',
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        postalCode: customer.postalCode || '00000',
        notes: customer.notes || ''
      },
      items: validatedItems,
      subtotal,
      shipping,
      total: grandTotal,
      payment: {
        method: paymentMethod || 'cod',
        status: 'pending',
        accountTitle: paymentMethod === 'jazzcash' ? 'Abdul Samad' : undefined,
        accountNumber: paymentMethod === 'jazzcash' ? '03238917805' : undefined,
        transactionId: paymentDetails?.transactionId || undefined,
        screenshotUrl: paymentDetails?.screenshotUrl || undefined,
        adminNotes: paymentMethod === 'jazzcash' ? 'Manual JazzCash verification required' : 'Cash upon delivery'
      },
      status: 'Pending',
      statusHistory: [
        {
          status: 'Pending',
          timestamp: new Date().toISOString(),
          note: `Order placed via ${paymentMethod ? paymentMethod.toUpperCase() : 'COD'}. Unique tracking ID: ${orderNumber}`
        }
      ],
      createdAt: new Date().toISOString()
    };

    const savedOrder = db.createOrder(newOrder);
    res.status(201).json({ success: true, order: savedOrder });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Orders: Get All (or filter by user)
app.get('/api/orders', (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    if (userId && typeof userId === 'string') {
      const orders = db.getOrdersByUserId(userId);
      return res.json({ success: true, count: orders.length, orders });
    }
    const orders = db.getOrders();
    res.json({ success: true, count: orders.length, orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Orders: Get Single by ID or OrderNumber
app.get('/api/orders/:id', (req: Request, res: Response) => {
  try {
    const order = db.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, order });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Update Order Status
app.put('/api/orders/:id/status', (req: Request, res: Response) => {
  try {
    const { status, note } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }
    const updated = db.updateOrderStatus(req.params.id, status, note || `Status updated to ${status}`);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, order: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Admin: Verify JazzCash Payment
app.put('/api/orders/:id/verify-payment', (req: Request, res: Response) => {
  try {
    const { status, adminNotes } = req.body;
    if (!status || !['verified', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Valid status (verified | rejected) required' });
    }
    const updated = db.updatePaymentVerification(req.params.id, status, adminNotes);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, order: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Contact Us Submission
app.post('/api/contact', (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
    }
    const saved = db.addContactMessage({
      id: `msg-${Date.now()}`,
      name,
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
      createdAt: new Date().toISOString()
    });
    res.status(201).json({ success: true, message: 'Thank you for reaching out. We will respond shortly.', contact: saved });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/contact', (_req: Request, res: Response) => {
  res.json({ success: true, messages: db.getContactMessages() });
});

// Newsletter Subscription
app.post('/api/newsletter', (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'A valid email is required' });
    }
    const added = db.addNewsletter(email);
    if (!added) {
      return res.json({ success: true, message: 'You are already subscribed to 19BeesKicks VIP updates.' });
    }
    res.status(201).json({ success: true, message: 'Welcome to 19BeesKicks. You are now subscribed.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/newsletter', (_req: Request, res: Response) => {
  res.json({ success: true, subscribers: db.getNewsletterSubscribers() });
});

// Admin Analytics Stats
app.get('/api/admin/stats', (_req: Request, res: Response) => {
  try {
    const orders = db.getOrders();
    const products = db.getProducts();
    const totalRevenue = orders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + o.total, 0);

    const pendingOrders = orders.filter(o => o.status === 'Pending').length;
    const pendingVerifications = orders.filter(o => o.payment.method === 'jazzcash' && o.payment.status === 'pending').length;
    const lowStockProducts = products.filter(p => p.stockCount <= 10);

    res.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders: orders.length,
        totalProducts: products.length,
        totalCustomers: 48, // Aggregate customer count
        pendingOrders,
        pendingVerifications,
        lowStockCount: lowStockProducts.length
      },
      lowStockProducts,
      recentOrders: orders.slice(0, 5)
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ---------------- VITE MIDDLEWARE / STATIC FILES ----------------

async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`19BeesKicks Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
