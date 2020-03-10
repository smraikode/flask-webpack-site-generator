"""
 Flask-Webpack-site-Generator is a skeleton Python/Flask application ready to
 be deployed as a static website. It is released under an MIT Licence.

 This file is the only Python script, and controls the entire app.
 Feel free to explore and adapt it to your own needs.

"""

import sys, os, json
from flask import Flask, render_template
from flask_frozen import Freezer
from warnings import simplefilter as filter_warnings

DEBUG = True
app = Flask(__name__)
app.config.from_object(__name__)
app.config["FREEZER_DESTINATION"] = os.path.join("../dist/")
freezer = Freezer(app)

# === URL Routes === #

@app.route('/')
def index():
    filename = os.path.join(app.static_folder, 'content\index.json')
    with open(filename) as blog_file:
        data = json.load(blog_file)
    return render_template('pages/index.html', page=data)

# === Main function  === #

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == 'build':
        filter_warnings("ignore")
        freezer.freeze()
    else:
        app.run(host='0.0.0.0', port=8000)
