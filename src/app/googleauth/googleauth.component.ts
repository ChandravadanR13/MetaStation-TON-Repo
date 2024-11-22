import { Component } from '@angular/core';

@Component({
  selector: 'app-googleauth',
  templateUrl: './googleauth.component.html',
  styleUrls: ['./googleauth.component.scss']
})
export class GoogleauthComponent {


  otpLength = 6; // Define the length of the OTP
  otpArray: number[] = Array(this.otpLength).fill(0); // Create an array to loop through in the template
  otpValues: string[] = new Array(this.otpLength).fill(''); // Array to store the OTP values

  // When the user inputs a value in the OTP field
  onInputChange(index: number, event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1 && index < this.otpLength - 1) {
      // Move to the next input
      const nextInput = input.nextElementSibling as HTMLElement;
      if (nextInput) {
        nextInput.focus(); // Focus the next input element
      }
    }

    this.checkOtpCompleted();
  }

  // Handle keydown events (e.g., backspace)
  onKeydown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && input.value === '') {
      // Move to the previous input
      const prevInput = input.previousElementSibling as HTMLElement;
      if (prevInput) {
        prevInput.focus(); // Focus the previous input element
      }
    }
  }

  // Check if the OTP is completely filled
  checkOtpCompleted(): void {
    const otp = this.otpValues.join('');
    if (otp.length === this.otpLength) {
      console.log('OTP Entered:', otp); // Handle OTP submission here
    }
  }

}
