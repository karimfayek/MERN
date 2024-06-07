// src/components/CategoryList.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const modalRef = useRef();

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await axios.get('http://localhost:4000/api/categories');
      setCategories(data);
    };
    getCategories();
  }, []);

  const openModal = (category) => {
    setSelectedCategory(category);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({}); // Reset selected answers when opening modal
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    console.log(selectedAnswers)
  };

  const handleNextQuestion = () => {
    if (selectedCategory && currentQuestionIndex < selectedCategory.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Optionally handle completion of all questions
      closeModal();
    }
  };

  const handleAnswerChange = (event) => {
    const { value } = event.target;
    setSelectedAnswers((prevSelectedAnswers) => {
      const currentAnswers = prevSelectedAnswers[currentQuestionIndex] || [];
      return {
        ...prevSelectedAnswers,
        [currentQuestionIndex]: currentAnswers.includes(value)
          ? currentAnswers.filter((answer) => answer !== value)
          : [...currentAnswers, value]
      };
    });
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      {categories.map((cat) => (
        <div key={cat._id}>
          <button onClick={() => openModal(cat)}>{cat.name}</button>
        </div>
      ))}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Category Questions"
      >
        <div ref={modalRef}>
          {selectedCategory && selectedCategory.questions.length > 0 && (
            <div>
              <h3>{selectedCategory.name}</h3>
              <p>{selectedCategory.questions[currentQuestionIndex].text}</p>
              {selectedCategory.questions[currentQuestionIndex].answers.map((answer) => (
                <div key={answer}>
                  <input
                    type="checkbox"
                    value={answer}
                    checked={(selectedAnswers[currentQuestionIndex] || []).includes(answer)}
                    onChange={handleAnswerChange}
                    id={answer}
                  />
                  <span>{answer}</span>
                </div>
              ))}
              <button onClick={handleNextQuestion}>Next</button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CategoryList;
