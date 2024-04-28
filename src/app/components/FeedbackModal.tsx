import React, { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import axios from 'axios';
import { Ban, Star } from 'lucide-react';

const AlertDialogDemo = ({ message, variant }: { message: string, variant: "default" | "destructive" }) => (
  <div className={`bg-white rounded border-2 border-slate-900 text-black p-4 fixed bottom-0 right-0 m-4`}>
    {variant === 'destructive' ? <Ban className="inline-block mr-2" /> : <Star className="inline-block mr-2" />}
    {message}
  </div>
);


interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (subjectId: string, userId: string, scores: { sentence: any; score: any }) => void;
  title: string;
  userId: string;
  subjectId: string;
}

const titles = [
  "Foi assídua e pontual.",
  "Demonstrou conhecimento atualizado e domínio do conteúdo das disciplinas.",
  "Promoveu a integração da teoria com a prática.",
  "Demonstrou conhecimento atualizado e domínio do conteúdo das disciplinas.",
  "Demonstrou clareza na exposição do conteúdo das disciplinas.",
  "Utilizou metodologias inovadoras ativas.",
  "Utilizou recursos adequados ao ensino das disciplinas.",
  "Apresentou avaliações coerentes com os conteúdos ministrados.",
  "Apresentou um bom relacionamento com a turma e proporcionou um clima de respeito mútuo e ético.",
];

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  open,
  onClose,
  onSubmit,
  title,
  subjectId,
  userId,
}: FeedbackModalProps) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [ratings, setRatings] = useState<any[]>(Array(titles.length).fill(''));
  const [isFeedbackSent, setIsFeedbackSent] = useState<boolean>(false); // Estado para controlar se a avaliação foi enviada

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newRatings = [...ratings];
    // Converta o valor de event.target.value para um número
    const newValue = parseFloat(event.target.value);
    // Verifique se o valor convertido é um número válido
    if (!isNaN(newValue)) {
      // Atribua o valor convertido a newRatings[currentStep]
      newRatings[currentStep] = newValue;
      setRatings(newRatings);
    }
  };
  
  const handleSubmitFeedback = async (feedbackData: { scores: { sentence: string; score: any }[], subjectId: string, userId: string }) => {
    try {
      // Desestruture diretamente os valores de feedbackData
      const { subjectId, userId } = feedbackData;

      // Mapeie os ratings para o formato correto
      const formattedScores = ratings.map((rating, index) => ({
        sentence: titles[index], // Use o título correspondente como a sentença
        score: rating, // O próprio rating é o score
      }));

      // Envie os dados para a API
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_PROD_BASE_URL}/users/rating`, {
        scores: formattedScores,
        subjectId,
        userId,
      });

      // Exiba a resposta da API no console
      console.log('API response:', response.data);
      setIsFeedbackSent(true); // Define o estado para indicar que a avaliação foi enviada
      onClose(); // Fecha o modal
        // Realize qualquer outra lógica necessária após o envio do feedback

    } catch (error) {
      // Trate qualquer erro que ocorra durante o envio do feedback
      console.error('Erro ao enviar feedback:', error);
    }
};

const handleNextStep = () => {
  if (currentStep < titles.length - 1) {
    setCurrentStep((prevStep) => prevStep + 1);
  } else {
    // Mapeie os ratings para o formato correto
    const formattedScores = ratings.map((rating, index) => ({
      sentence: titles[index], // Use o título correspondente como a sentença
      score: parseInt(rating), // O próprio rating é o score
    }));

    // Passe os scores formatados para handleSubmitFeedback
    handleSubmitFeedback({
      scores: formattedScores, // Passando os scores formatados
      subjectId, // Passando o subjectId
      userId, // Passando o userId
    });
  }
};


  const handleBackStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const renderInputComponent = () => {
    return (
      <RadioGroup
        row
        aria-label="rating"
        name="rating"
        value={ratings[currentStep]}
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
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    maxWidth: 500,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <>
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="feedback-modal-title"
      aria-describedby="feedback-modal-description"
    >
      <Box sx={style}>
        <Typography id="feedback-modal-title" variant="h6" component="h2">
          {titles[currentStep]}
        </Typography>
        <FormControl fullWidth>{renderInputComponent()}</FormControl>
        <Button className='bg-default hover:bg-default/90 text-white' onClick={currentStep === 0 ? handleBackStep : () => { }} sx={{ mt: 2, mr: 2 }}>
          Voltar
        </Button>
        {currentStep !== titles.length - 1 && (
          <Button className='bg-default hover:bg-default/90 text-white' onClick={handleNextStep} sx={{ mt: 2 }}>
            Próximo
          </Button>
        )}
        {currentStep === titles.length - 1 && (
          <Button
            className='bg-default hover:bg-default/90 text-white'
            onClick={() => {
              const formattedScores = ratings.map((rating, index) => ({
                sentence: titles[index], // Use o título correspondente como a sentença
                score: rating, // O próprio rating é o score
              }));
              handleSubmitFeedback({ scores: formattedScores, subjectId, userId })
            }}
            sx={{ mt: 2 }}
          >
            Confirmar
          </Button>

        )}
      </Box>
    </Modal>
     {isFeedbackSent && !open && (
     <AlertDialogDemo message="AVALIAÇÃO ENVIADA!" variant="default" />
   )}
   </>
  );
};

export default FeedbackModal;
