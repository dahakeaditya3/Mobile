import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,  // ⬅️ Standalone component
  imports: [CommonModule, FormsModule], // ⬅️ Import FormsModule here
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  isOpen = false;
  userInput = '';
  messages: { from: string, text: string }[] = [
    { from: 'bot', text: 'Hello 👋, how can I help you today?' }
  ];

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    // Add user message
    this.messages.push({ from: 'user', text: this.userInput });

    // Simple rule-based responses
    let reply = "Sorry, I don't understand. 🙁";
    if (this.userInput.toLowerCase().includes('order')) reply = "You can check your orders in My Orders section.";
    if (this.userInput.toLowerCase().includes('login')) reply = "Click on the Login button in the navbar.";
    if (this.userInput.toLowerCase().includes('register')) reply = "You can register as a Customer or Seller on the Register page.";

    this.messages.push({ from: 'bot', text: reply });

    this.userInput = '';
  }
}
