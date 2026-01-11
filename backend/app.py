from flask import Flask, jsonify
from datetime import datetime
import os

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'service': 'backend',
        'timestamp': datetime.utcnow().isoformat()
    }), 200

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({
        'message': 'Hello from Backend Service!',
        'timestamp': datetime.utcnow().isoformat(),
        'version': '1.0.0',
        'environment': os.getenv('ENVIRONMENT', 'development'),
        'data': {
            'items': [
                {'id': 1, 'name': 'Item 1', 'status': 'active'},
                {'id': 2, 'name': 'Item 2', 'status': 'active'},
                {'id': 3, 'name': 'Item 3', 'status': 'inactive'}
            ]
        }
    }), 200

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
