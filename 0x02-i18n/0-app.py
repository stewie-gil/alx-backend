#!/usr/bin/env python3
"""Basic flask application"""


from flask import Flask, render_template


app = Flask(__name__)


@app.route("/")
def index():
    """ serves 0-index.html file for route /"""
    return render_template("0-index.html")

if __name__ == "__main__":
    app.run(debug = True)
