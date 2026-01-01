import os
from flask import Flask, render_template, request, send_file, jsonify
from flask_cors import CORS, cross_origin
from rembg import remove

app = Flask(__name__)
CORS(app)  # Aktifkan CORS untuk keseluruhan aplikasi (opsional)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
@cross_origin()  # Atau tambahkan decorator cross_origin di setiap route yang memerlukan CORS
def process_image():
    temp_dir = 'temp_images'
    os.makedirs(temp_dir, exist_ok=True)

    files = request.files.getlist('images')
    processed_files = []

    for file in files:
        img_data = file.read()
        output = remove(img_data)

        filename = file.filename.rsplit('.', 1)[0] + '.png'
        output_path = os.path.join(temp_dir, filename)
        
        with open(output_path, 'wb') as f:
            f.write(output)
        
        processed_files.append(filename)

    # Mengembalikan response dengan URL gambar yang dihasilkan
    return jsonify({'processed_files': processed_files})

@app.route('/download/<filename>')
def download_file(filename):
    temp_dir = 'temp_images'
    return send_file(os.path.join(temp_dir, filename), mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
