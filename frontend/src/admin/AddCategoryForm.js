import React, { useState } from 'react';
import axios from 'axios';

const AddCategoryForm = () => {
  const [name, setName] = useState('');
  const [questions, setQuestions] = useState([{ text: '', answers: [''] }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', answers: [''] }]);
    console.log('questions' , questions)
  };

  const handleAddAnswer = (questionIndex) => {
    const newQuestions = questions.map((q, index) => {
      if (index === questionIndex) {
        return { ...q, answers: [...q.answers, ''] };
      }
      console.log('q',q)
      return q;
    });
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = questions.map((q, i) => {
      if (i === index) {
        return { ...q, text: value };
      }
      console.log('quest change' , q)
      return q;
    });
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (qIndex, aIndex, value) => {
    const newQuestions = questions.map((q, qi) => {
      if (qi === qIndex) {
        const newAnswers = q.answers.map((a, ai) => {
          if (ai === aIndex) {
            return value;
          }
          return a;
        });
        return { ...q, answers: newAnswers };
      }
      return q;
    });
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/categories', {
        name,
        questions
      });
      console.log(response.data);
      setName('');
      setQuestions([{ text: '', answers: [''] }]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Category Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Questions:</label>
        {questions.map((q, qIndex) => (
          <div key={qIndex}>
            <input
              type="text"
              placeholder="Question text"
              value={q.text}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              required
            />
            {q.answers.map((a, aIndex) => (
              <input
                key={aIndex}
                type="text"
                placeholder="Answer"
                value={a}
                onChange={(e) => handleAnswerChange(qIndex, aIndex, e.target.value)}
                required
              />
            ))}
            <button type="button" onClick={() => handleAddAnswer(qIndex)}>
              Add Answer
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddCategoryForm;
