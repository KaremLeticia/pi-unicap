import React, { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import axios from 'axios';
import { useUser } from "@/contexts/UserProvider";

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (course: string, rating: any) => void;
  title: string;
  courses: string[];
}

const titles = [
  "1.1 Foi assídua e pontual.",
  "1.2 Demonstrou conhecimento atualizado e domínio do conteúdo das disciplinas.",
  "1.3 Promoveu a integração da teoria com a prática.",
  "1.4 Demonstrou conhecimento atualizado e domínio do conteúdo das disciplinas.",
  "1.5 Demonstrou clareza na exposição do conteúdo das disciplinas.",
  "1.6 Utilizou metodologias inovadoras ativas.",
  "1.7 Utilizou recursos adequados ao ensino das disciplinas.",
  "1.8 Apresentou avaliações coerentes com os conteúdos ministrados.",
  "1.9 Apresentou um bom relacionamento com a turma e proporcionou um clima de respeito mútuo e ético.",
];

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  open,
  onClose,
  onSubmit,
  title,
  courses,
}: FeedbackModalProps) => {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isCourseConfirmed, setCourseConfirmed] = useState<boolean>(false);
  const [ratings, setRatings] = useState<string[]>(Array(titles.length).fill(''));
  const { userId } = useUser();

  const handleCourseChange = (event: SelectChangeEvent<string>) => {
    setSelectedCourse(event.target.value);
  };

  const handleConfirmCourse = () => {
    if (selectedCourse) {
      setCurrentStep((prevStep) => prevStep + 1);
      setCourseConfirmed(true);
    }
  };

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newRatings = [...ratings];
    newRatings[currentStep - 1] = event.target.value;
    setRatings(newRatings);
  };

  const handleSubmitFeedback = async () => {
    try {
      console.log('Submitting feedback:', { course: selectedCourse, ratings });
  
      if (userId) {
        const response = await axios.post('/api/subjects', {
          name: selectedCourse,
          rating: ratings,
          userId: userId,
        });
  
        console.log('API response:', response.data);
        console.log(userId);
        onSubmit(selectedCourse, ratings);
        onClose();
      } else {
        console.error('User ID is not available.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };
    
  const handleNextStep = () => {
    if (currentStep < titles.length) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      handleSubmitFeedback();
    }
  };

  const handleBackStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const renderInputComponent = () => {
    if (currentStep === 0) {
      return (
        <Select
          label="Selecione a matéria"
          value={selectedCourse}
          onChange={handleCourseChange}
          sx={{ mt: 2 }}
        >
          {courses.map((course) => (
            <MenuItem key={course} value={course}>
              {course}
            </MenuItem>
          ))}
        </Select>
      );
    } else {
      return (
        <RadioGroup
          row
          aria-label="rating"
          name="rating"
          value={ratings[currentStep - 1]}
          onChange={handleRatingChange}
        >
          {[0, 1, 2, 3, 4, 5].map((value) => (
            <FormControlLabel
              key={value}
              value={value.toString()}
              control={<Radio />}
              label={value.toString()}
            />
          ))}
        </RadioGroup>
      );
    }
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxWidth: 400,
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="feedback-modal-title"
      aria-describedby="feedback-modal-description"
    >
      <Box sx={style}>
        <Typography id="feedback-modal-title" variant="h6" component="h2">
          {currentStep === 0 ? 'Selecione a matéria' : titles[currentStep - 1]}
        </Typography>
        <FormControl fullWidth>{renderInputComponent()}</FormControl>
        <Button onClick={currentStep === 0 ? handleConfirmCourse : handleBackStep} sx={{ mt: 2, mr: 2 }}>
          {currentStep === 0 ? 'Confirm' : 'Back'}
        </Button>
        {isCourseConfirmed && (
          <Button onClick={handleNextStep} sx={{ mt: 2 }}>
            {currentStep === titles.length ? 'Submit' : 'Next'}
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default FeedbackModal;
