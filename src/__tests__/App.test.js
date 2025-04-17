import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../components/App';

test('displays question prompts after fetching', async () => {
  render(<App />);
  
  // Simulate form submission to add a new question
  fireEvent.change(screen.getByLabelText(/Prompt/i), { target: { value: 'What is React?' } });
  fireEvent.change(screen.getByLabelText(/Answer 1/i), { target: { value: 'A library' } });
  fireEvent.change(screen.getByLabelText(/Answer 2/i), { target: { value: 'A framework' } });
  fireEvent.change(screen.getByLabelText(/Answer 3/i), { target: { value: 'A language' } });
  fireEvent.change(screen.getByLabelText(/Correct Answer/i), { target: { value: '0' } });
  fireEvent.click(screen.getByText(/Submit/i));

  // Ensure question appears after form submission
  await waitFor(() => {
    expect(screen.getByText(/What is React?/i)).toBeInTheDocument();
  });
});

test('creates a new question when the form is submitted', async () => {
  render(<App />);
  
  // Fill out the form
  fireEvent.change(screen.getByLabelText(/Prompt/i), { target: { value: 'What is JavaScript?' } });
  fireEvent.change(screen.getByLabelText(/Answer 1/i), { target: { value: 'A programming language' } });
  fireEvent.change(screen.getByLabelText(/Answer 2/i), { target: { value: 'A coffee' } });
  fireEvent.change(screen.getByLabelText(/Answer 3/i), { target: { value: 'A book' } });
  fireEvent.change(screen.getByLabelText(/Correct Answer/i), { target: { value: '0' } });
  
  // Submit the form
  fireEvent.click(screen.getByText(/Submit/i));

  // Verify the question appears
  await waitFor(() => {
    expect(screen.getByText(/What is JavaScript?/i)).toBeInTheDocument();
  });
});

test('deletes the question when the delete button is clicked', async () => {
  render(<App />);
  
  // Add a question first
  fireEvent.change(screen.getByLabelText(/Prompt/i), { target: { value: 'What is React?' } });
  fireEvent.change(screen.getByLabelText(/Answer 1/i), { target: { value: 'A library' } });
  fireEvent.change(screen.getByLabelText(/Answer 2/i), { target: { value: 'A framework' } });
  fireEvent.change(screen.getByLabelText(/Answer 3/i), { target: { value: 'A language' } });
  fireEvent.change(screen.getByLabelText(/Correct Answer/i), { target: { value: '0' } });
  fireEvent.click(screen.getByText(/Submit/i));

  // Click delete button
  fireEvent.click(screen.getByText(/Delete Question/i));

  // Verify the question is removed
  await waitFor(() => {
    expect(screen.queryByText(/What is React?/i)).toBeNull();
  });
});

test('updates the answer when the dropdown is changed', async () => {
  render(<App />);
  
  // Add a question first
  fireEvent.change(screen.getByLabelText(/Prompt/i), { target: { value: 'What is JavaScript?' } });
  fireEvent.change(screen.getByLabelText(/Answer 1/i), { target: { value: 'A programming language' } });
  fireEvent.change(screen.getByLabelText(/Answer 2/i), { target: { value: 'A coffee' } });
  fireEvent.change(screen.getByLabelText(/Answer 3/i), { target: { value: 'A book' } });
  fireEvent.change(screen.getByLabelText(/Correct Answer/i), { target: { value: '0' } });
  fireEvent.click(screen.getByText(/Submit/i));

  // Change the correct answer
  fireEvent.change(screen.getByLabelText(/Correct Answer/i), { target: { value: '2' } });
  
  // Ensure that the updated answer is reflected
  await waitFor(() => {
    expect(screen.getByDisplayValue('A book')).toBeInTheDocument();
  });
});
