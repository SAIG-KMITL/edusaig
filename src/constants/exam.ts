import { ExamAttempt, ExamType } from "@/types/exam.type";

export const exam: ExamType = {
  id: "exam123",
  courseModuleId: "123",
  title: "General Knowledge Quiz",
  description: "Test your general knowledge with this fun quiz.",
  timeLimit: "20:00",
  passingScore: 80,
  maxAttempts: 3,
  shuffleQuestions: true,
  status: "active",
  createdAt: "2024-11-15T10:00:00Z",
  updatedAt: "2024-11-15T10:00:00Z",

  questions: [
    {
      id: "question1",
      examId: "exam123",
      question: "What is the capital of France?",
      type: "multiple-choice",
      points: 10,
      orderIndex: 1,
      createdAt: "2024-11-15T10:00:00Z",
      updatedAt: "2024-11-15T10:00:00Z",
      options: [
        { id: "option1a", questionId: "question1", optionText: "Paris", isCorrect: true, explanation: "Paris is the capital city of France.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option1b", questionId: "question1", optionText: "London", isCorrect: false, explanation: "London is the capital of the UK.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option1c", questionId: "question1", optionText: "Berlin", isCorrect: false, explanation: "Berlin is the capital of Germany.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option1d", questionId: "question1", optionText: "Rome", isCorrect: false, explanation: "Rome is the capital of Italy.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
      ],
    },
    {
      id: "question2",
      examId: "exam123",
      question: "Which planet is known as the Red Planet?",
      type: "multiple-choice",
      points: 10,
      orderIndex: 2,
      createdAt: "2024-11-15T10:00:00Z",
      updatedAt: "2024-11-15T10:00:00Z",
      options: [
        { id: "option2a", questionId: "question2", optionText: "Mars", isCorrect: true, explanation: "Mars is called the Red Planet due to its reddish appearance.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option2b", questionId: "question2", optionText: "Venus", isCorrect: false, explanation: "Venus is known as Earth's sister planet.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option2c", questionId: "question2", optionText: "Jupiter", isCorrect: false, explanation: "Jupiter is the largest planet in the solar system.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option2d", questionId: "question2", optionText: "Saturn", isCorrect: false, explanation: "Saturn is known for its rings.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
      ],
    },
    {
      id: "question3",
      examId: "exam123",
      question: "Who wrote the play 'Romeo and Juliet'?",
      type: "multiple-choice",
      points: 10,
      orderIndex: 3,
      createdAt: "2024-11-15T10:00:00Z",
      updatedAt: "2024-11-15T10:00:00Z",
      options: [
        { id: "option3a", questionId: "question3", optionText: "William Shakespeare", isCorrect: true, explanation: "William Shakespeare wrote 'Romeo and Juliet.'", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option3b", questionId: "question3", optionText: "Charles Dickens", isCorrect: false, explanation: "Charles Dickens is a novelist, not a playwright.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option3c", questionId: "question3", optionText: "Jane Austen", isCorrect: false, explanation: "Jane Austen is known for her novels, not plays.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option3d", questionId: "question3", optionText: "George Orwell", isCorrect: false, explanation: "George Orwell is a modern novelist.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
      ],
    },
    {
      id: "question4",
      examId: "exam123",
      question: "What is the chemical symbol for water?",
      type: "multiple-choice",
      points: 10,
      orderIndex: 4,
      createdAt: "2024-11-15T10:00:00Z",
      updatedAt: "2024-11-15T10:00:00Z",
      options: [
        { id: "option4a", questionId: "question4", optionText: "H2O", isCorrect: true, explanation: "H2O is the chemical formula for water.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option4b", questionId: "question4", optionText: "O2", isCorrect: false, explanation: "O2 is the chemical formula for oxygen gas.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option4c", questionId: "question4", optionText: "CO2", isCorrect: false, explanation: "CO2 is the chemical formula for carbon dioxide.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option4d", questionId: "question4", optionText: "NaCl", isCorrect: false, explanation: "NaCl is the chemical formula for salt.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
      ],
    },
    {
      id: "question5",
      examId: "exam123",
      question: "How many continents are there on Earth?",
      type: "multiple-choice",
      points: 10,
      orderIndex: 5,
      createdAt: "2024-11-15T10:00:00Z",
      updatedAt: "2024-11-15T10:00:00Z",
      options: [
        { id: "option5a", questionId: "question5", optionText: "7", isCorrect: true, explanation: "Earth has seven continents: Africa, Antarctica, Asia, Europe, North America, Oceania, and South America.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option5b", questionId: "question5", optionText: "5", isCorrect: false, explanation: "Five continents is incorrect; two are missing.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option5c", questionId: "question5", optionText: "6", isCorrect: false, explanation: "Six is incorrect; it excludes one continent.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option5d", questionId: "question5", optionText: "8", isCorrect: false, explanation: "Earth officially has seven continents.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
      ],
    },
    {
      id: "question6",
      examId: "exam123",
      question: "What is the boiling point of water at sea level?",
      type: "multiple-choice",
      points: 10,
      orderIndex: 6,
      createdAt: "2024-11-15T10:00:00Z",
      updatedAt: "2024-11-15T10:00:00Z",
      options: [
        { id: "option6a", questionId: "question6", optionText: "100°C", isCorrect: true, explanation: "Water boils at 100°C at sea level.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option6b", questionId: "question6", optionText: "50°C", isCorrect: false, explanation: "50°C is not hot enough for boiling water.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option6c", questionId: "question6", optionText: "212°F", isCorrect: true, explanation: "This is equivalent to 100°C at sea level.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option6d", questionId: "question6", optionText: "150°C", isCorrect: false, explanation: "This temperature is above the boiling point of water.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" }
      ]
    },
    {
      id: "question7",
      examId: "exam123",
      question: "Who painted the Mona Lisa?",
      type: "multiple-choice",
      points: 10,
      orderIndex: 7,
      createdAt: "2024-11-15T10:00:00Z",
      updatedAt: "2024-11-15T10:00:00Z",
      options: [
        { id: "option7a", questionId: "question7", optionText: "Leonardo da Vinci", isCorrect: true, explanation: "Leonardo da Vinci is the artist behind the Mona Lisa.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option7b", questionId: "question7", optionText: "Pablo Picasso", isCorrect: false, explanation: "Picasso is known for cubism, not the Mona Lisa.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option7c", questionId: "question7", optionText: "Vincent van Gogh", isCorrect: false, explanation: "Van Gogh painted 'Starry Night,' not the Mona Lisa.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option7d", questionId: "question7", optionText: "Claude Monet", isCorrect: false, explanation: "Monet is an Impressionist painter.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" }
      ]
    },
    {
      id: "question8",
      examId: "exam123",
      question: "Which gas do plants primarily use during photosynthesis?",
      type: "multiple-choice",
      points: 10,
      orderIndex: 8,
      createdAt: "2024-11-15T10:00:00Z",
      updatedAt: "2024-11-15T10:00:00Z",
      options: [
        { id: "option8a", questionId: "question8", optionText: "Carbon dioxide (CO2)", isCorrect: true, explanation: "Plants use CO2 and convert it into glucose during photosynthesis.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option8b", questionId: "question8", optionText: "Oxygen (O2)", isCorrect: false, explanation: "Oxygen is released as a by-product, not used.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option8c", questionId: "question8", optionText: "Nitrogen (N2)", isCorrect: false, explanation: "Nitrogen is not directly involved in photosynthesis.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option8d", questionId: "question8", optionText: "Methane (CH4)", isCorrect: false, explanation: "Methane is not used in photosynthesis.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" }
      ]
    },
    {
      id: "question9",
      examId: "exam123",
      question: "What is the largest mammal on Earth?",
      type: "multiple-choice",
      points: 10,
      orderIndex: 9,
      createdAt: "2024-11-15T10:00:00Z",
      updatedAt: "2024-11-15T10:00:00Z",
      options: [
        { id: "option9a", questionId: "question9", optionText: "Blue Whale", isCorrect: true, explanation: "The blue whale is the largest mammal on Earth.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option9b", questionId: "question9", optionText: "African Elephant", isCorrect: false, explanation: "While large, it is much smaller than a blue whale.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option9c", questionId: "question9", optionText: "Giraffe", isCorrect: false, explanation: "Giraffes are tall, but not the largest mammals.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option9d", questionId: "question9", optionText: "Humpback Whale", isCorrect: false, explanation: "Humpback whales are smaller than blue whales.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" }
      ]
    },
    {
      id: "question10",
      examId: "exam123",
      question: "What is the smallest prime number?",
      type: "multiple-choice",
      points: 10,
      orderIndex: 10,
      createdAt: "2024-11-15T10:00:00Z",
      updatedAt: "2024-11-15T10:00:00Z",
      options: [
        { id: "option10a", questionId: "question10", optionText: "2", isCorrect: true, explanation: "2 is the smallest prime number and the only even one.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option10b", questionId: "question10", optionText: "1", isCorrect: false, explanation: "1 is not considered a prime number.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option10c", questionId: "question10", optionText: "3", isCorrect: false, explanation: "3 is a prime number but not the smallest.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option10d", questionId: "question10", optionText: "0", isCorrect: false, explanation: "0 is not a prime number.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" }
      ]
    },
    {
      id: "question11",
      examId: "exam123",
      question: "Which organ in the human body is responsible for pumping blood?",
      type: "multiple-choice",
      points: 10,
      orderIndex: 11,
      createdAt: "2024-11-15T10:00:00Z",
      updatedAt: "2024-11-15T10:00:00Z",
      options: [
        { id: "option11a", questionId: "question11", optionText: "Heart", isCorrect: true, explanation: "The heart pumps blood throughout the body.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option11b", questionId: "question11", optionText: "Lungs", isCorrect: false, explanation: "The lungs facilitate oxygen exchange but do not pump blood.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option11c", questionId: "question11", optionText: "Liver", isCorrect: false, explanation: "The liver processes nutrients, not blood circulation.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option11d", questionId: "question11", optionText: "Kidneys", isCorrect: false, explanation: "Kidneys filter blood but do not pump it.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" }
      ]
    },
    {
      id: "question12",
      examId: "exam123",
      question: "What is the name of the process by which plants make their food?",
      type: "multiple-choice",
      points: 10,
      orderIndex: 12,
      createdAt: "2024-11-15T10:00:00Z",
      updatedAt: "2024-11-15T10:00:00Z",
      options: [
        { id: "option12a", questionId: "question12", optionText: "Photosynthesis", isCorrect: true, explanation: "Plants use sunlight to make food through photosynthesis.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option12b", questionId: "question12", optionText: "Respiration", isCorrect: false, explanation: "Respiration is how plants and animals use energy.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option12c", questionId: "question12", optionText: "Osmosis", isCorrect: false, explanation: "Osmosis is water movement, not food production.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" },
        { id: "option12d", questionId: "question12", optionText: "Transpiration", isCorrect: false, explanation: "Transpiration involves water loss in plants.", createdAt: "2024-11-15T10:00:00Z", updatedAt: "2024-11-15T10:00:00Z" }
      ]
    },
  ],
};

export const examAttempt: ExamAttempt = {
  id: "1",
  examId: "1",
  userId: "1",
  score: 60.0,
  status: "active",
  startedAt: "2024-11-15T09:50:31Z",
  submittedAt: "2024-11-15T10:00:00Z",
  createdAt: "2024-11-15T10:00:00Z",
  updatedAt: "2024-11-15T10:00:00Z",
}
