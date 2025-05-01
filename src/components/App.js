import React, { useState } from 'react';
import '@testing-library/jest-dom/extend-expect';


function App() {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    prompt: '',
    answer1: '',
    answer2: '',
    answer3: '',
    correctAnswer: '0',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      prompt: formData.prompt,
      answers: [formData.answer1, formData.answer2, formData.answer3],
      correctAnswer: formData.correctAnswer,
    };
    setQuestions((prev) => [...prev, newQuestion]);
    setFormData({
      prompt: '',
      answer1: '',
      answer2: '',
      answer3: '',
      correctAnswer: '0',
    });
  };

  const handleDelete = (indexToDelete) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, index) => index !== indexToDelete)
    );
  };

  const handleCorrectAnswerChange = (index, newValue) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAnswer = newValue;
    setQuestions(updatedQuestions);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">Prompt</label>
        <input
          id="prompt"
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
        />

        <label htmlFor="answer1">Answer 1</label>
        <input
          id="answer1"
          name="answer1"
          value={formData.answer1}
          onChange={handleChange}
        />

        <label htmlFor="answer2">Answer 2</label>
        <input
          id="answer2"
          name="answer2"
          value={formData.answer2}
          onChange={handleChange}
        />

        <label htmlFor="answer3">Answer 3</label>
        <input
          id="answer3"
          name="answer3"
          value={formData.answer3}
          onChange={handleChange}
        />

        <label htmlFor="correctAnswer">Correct Answer</label>
        <select
          id="correctAnswer"
          name="correctAnswer"
          value={formData.correctAnswer}
          onChange={handleChange}
        >
          <option value="0">Answer 1</option>
          <option value="1">Answer 2</option>
          <option value="2">Answer 3</option>
        </select>

        <button type="submit">Submit</button>
      </form>

      <ul>
        {questions.map((question, index) => (
          <li key={index}>
            <p>{question.prompt}</p>
            <ul>
              {question.answers.map((answer, i) => (
                <li key={i}>{answer}</li>
              ))}
            </ul>

            <label htmlFor={`correctAnswer-${index}`}>Correct Answer</label>
            <select
              id={`correctAnswer-${index}`}
              value={question.correctAnswer}
              onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
            >
              <option value="0">Answer 1</option>
              <option value="1">Answer 2</option>
              <option value="2">Answer 3</option>
            </select>

            <button onClick={() => handleDelete(index)}>Delete Question</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
