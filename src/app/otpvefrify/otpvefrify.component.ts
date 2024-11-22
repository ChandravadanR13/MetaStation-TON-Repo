import { Component } from '@angular/core';

@Component({
  selector: 'app-otpvefrify',
  templateUrl: './otpvefrify.component.html',
  styleUrls: ['./otpvefrify.component.scss']
})
export class OtpvefrifyComponent {
  otpArray: string[] = ['', '', '', ''];

  onInput(event: any, index: number) {
    const input = event.target.value;

    if (/^[0-9]$/.test(input)) { // Ensure that only a single digit (0-9) is entered
      this.otpArray[index] = input;

      if (index < this.otpArray.length - 1) {
        const nextInput = document.querySelectorAll('.otp-box')[index + 1] as HTMLInputElement;
        nextInput.focus();
      } else {
        event.target.blur(); // Optionally blur on the last input
      }
    } else {
      this.otpArray[index] = ''; // Reset the value if non-numeric input is detected
    }
  }

  onKeyDown(event: any, index: number) {
    if (event.key === 'Backspace') {
      this.otpArray[index] = ''; // Clear the current box

      if (index > 0) {
        const prevInput = document.querySelectorAll('.otp-box')[index - 1] as HTMLInputElement;
        prevInput.focus();
      }
    }
  }

  onFocus(event: any) {
    event.target.select(); // Select text to allow for easy replacement
  }
}