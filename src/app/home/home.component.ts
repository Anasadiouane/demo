import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule]
})
export class HomeComponent {
  board = signal(Array(9).fill(''));
  xIsNext = signal(true);
  winner = signal<string | null>(null);

  reset() {
    this.board.set(Array(9).fill(''));
    this.xIsNext.set(true);
    this.winner.set(null);
  }

  makeMove(index: number) {
    if (this.winner() || this.board()[index]) return;
    const current = this.xIsNext() ? 'X' : 'O';
    const next = this.board().slice();
    next[index] = current;
    this.board.set(next);
    const w = this.calculateWinner(next);
    if (w) {
      this.winner.set(w);
    } else {
      this.xIsNext.set(!this.xIsNext());
    }
  }

  calculateWinner(squares: string[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    if (squares.every(Boolean)) return 'Draw';
    return null;
  }
}
