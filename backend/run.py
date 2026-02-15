
import os
import sys

# Force unbuffered output
sys.stdout.reconfigure(line_buffering=True)
sys.stderr.reconfigure(line_buffering=True)

print("=== STARTUP SCRIPT BEGIN ===")
print(f"Current Directory: {os.getcwd()}")
print(f"Directory Contents: {os.listdir('.')}")
print(f"Python Path: {sys.path}")

try:
    print("Attempting to import uvicorn...")
    import uvicorn
    print("Uvicorn imported successfully.")
    
    print("Attempting to import app.main...")
    from app.main import app
    print("App imported successfully.")

except ImportError as e:
    print(f"CRITICAL IMPORT ERROR: {e}")
    sys.exit(1)
except Exception as e:
    print(f"CRITICAL UNKNOWN ERROR: {e}")
    sys.exit(1)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    print(f"Starting server on port {port}...")
    
    # Run uvicorn programmatically
    # We use the string syntax "app.main:app" to allow workers (if needed) 
    # but here we use simple non-reloading run.
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, log_level="info")
