from flask import Flask, render_template, request, jsonify
from solver import solve_sudoku
from generator import generate_puzzle

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate", methods=["GET"])
def generate():
    puzzle = generate_puzzle()
    return jsonify({"puzzle": puzzle})


@app.route("/solve", methods=["POST"])
def solve():
    data = request.get_json()
    puzzle = data.get("puzzle")

    if not puzzle:
        return jsonify({"error": "Invalid puzzle"}), 400

    grid = [row[:] for row in puzzle]

    if solve_sudoku(grid):
        return jsonify({"solution": grid})
    else:
        return jsonify({"error": "No solution found"}), 400


if __name__ == "__main__":
    app.run(debug=True)
