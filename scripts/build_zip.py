import os
import zipfile

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
PUBLIC_DIR = os.path.join(ROOT_DIR, 'public')
ZIP_FILE = os.path.join(PUBLIC_DIR, '19BeesKicks-complete-project.zip')

os.makedirs(PUBLIC_DIR, exist_ok=True)

EXCLUDED_DIRS = {
    'node_modules', '.git', 'dist', '.vite', '__pycache__', '.cache'
}
EXCLUDED_EXTS = {'.pyc', '.pyo'}

print(f"Creating zip from {ROOT_DIR} to {ZIP_FILE}...")

with zipfile.ZipFile(ZIP_FILE, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(ROOT_DIR):
        # Exclude directories
        dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRS]
        
        for file in files:
            if file == '19BeesKicks-complete-project.zip':
                continue
            _, ext = os.path.splitext(file)
            if ext in EXCLUDED_EXTS:
                continue

            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, ROOT_DIR)
            zipf.write(full_path, rel_path)

size_mb = os.path.getsize(ZIP_FILE) / (1024 * 1024)
print(f"Zip created successfully! Size: {size_mb:.2f} MB")
