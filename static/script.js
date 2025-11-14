const grid = document.getElementById("sudoku-grid");
const message = document.getElementById("message");

// Build Input Grid
for (let i = 0; i < 81; i++) {
    const input = document.createElement("input");
    input.type = "number";
    input.min = 1;
    input.max = 9;
    grid.appendChild(input);
}

function getGrid() {
    const cells = grid.querySelectorAll("input");
    const puzzle = [];
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            const value = cells[i * 9 + j].value;
            row.push(value ? parseInt(value) : 0);
        }
        puzzle.push(row);
    }
    return puzzle;
}

function setGrid(board) {
    const cells = grid.querySelectorAll("input");
    for (let i = 0; i < 81; i++) {
        const r = Math.floor(i / 9);
        const c = i % 9;
        cells[i].value = board[r][c] !== 0 ? board[r][c] : "";
    }
}

document.getElementById("generate").onclick = async () => {
    message.textContent = "Generating...";
    const res = await fetch("/generate");
    const data = await res.json();
    setGrid(data.puzzle);
    message.textContent = "Puzzle generated!";
};

document.getElementById("solve").onclick = async () => {
    message.textContent = "Solving...";
    const puzzle = getGrid();

    const res = await fetch("/solve", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ puzzle })
    });

    const data = await res.json();

    if (res.ok) {
        setGrid(data.solution);
        message.textContent = "Solved!";
    } else {
        message.textContent = data.error;
    }
};

document.getElementById("clear").onclick = () => {
    grid.querySelectorAll("input").forEach(cell => cell.value = "");
};
