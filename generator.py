import random
from solver import solve_sudoku

def generate_full_board():
    board = [[0] * 9 for _ in range(9)]
    solve_sudoku(board)
    return board


def remove_cells(board, difficulty=40):
    new_board = [row[:] for row in board]

    count = difficulty
    while count > 0:
        row = random.randint(0, 8)
        col = random.randint(0, 8)
        if new_board[row][col] != 0:
            new_board[row][col] = 0
            count -= 1
    return new_board


def generate_puzzle():
    full = generate_full_board()
    puzzle = remove_cells(full, difficulty=50)  # moderate difficulty
    return puzzle
