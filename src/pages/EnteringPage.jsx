import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { EnterInput } from '../components/EnterInput';
import { LoadingPage } from '../pages/LoadingPage';

export const EnteringPage = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [salary, setSalary] = useState('');
  const [expenses, setExpenses] = useState('');
  const [goalYears, setGoalYears] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [submitting, setSubmitting] = useState(false); // Track form submission state

  const handleSubmit = async () => {
    setSubmitting(true); // Start form submission
    try {
      const response = await axios.post('https://asdf.loca.lt/good', {
        name,
        age: parseInt(age, 10),
        salary: parseInt(salary, 10),
        fixed_expenses: parseInt(expenses, 10),
        year: parseInt(goalYears, 10),
        target: parseInt(goalAmount, 10),
      });
      console.log('Response:', response.data);
      navigate('/main', { state: response.data }); // Redirect on success
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    } finally {
      setSubmitting(false); // Stop form submission
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/main'); // Redirect after 10 seconds if not submitted
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (submitting) {
    return <LoadingPage />; // Show loading indicator during form submission
  }

  return (
    <Container>
      <Title>SSUL's 재무설계</Title>
      <EnterInput Title="이름" value={name} onChange={(e) => setName(e.target.value)} />
      <EnterInput Title="나이" value={age} onChange={(e) => setAge(e.target.value)} />
      <EnterInput Title="월급(만)" value={salary} onChange={(e) => setSalary(e.target.value)} />
      <EnterInput Title="한달 고정 지출비(만)" value={expenses} onChange={(e) => setExpenses(e.target.value)} />
      <InputContainer>
        <InputTitle>목표</InputTitle>
        <div>
          <Input
            value={goalYears}
            onChange={(e) => setGoalYears(e.target.value)}
          />
          <Content>년 안에</Content>
          <Input
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
          />
          <Content>만원 모으기</Content>
        </div>
      </InputContainer>
      <Button onClick={handleSubmit} disabled={submitting}>
        결과 확인하기
      </Button>
    </Container>
  );
};

const Container = styled.div`
  height: 900px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.p`
  font-size: 40px;
  margin-bottom: 20px;
  font-weight: 500;
`;

const InputTitle = styled.p`
  font-size: 20px;
  color: #787878;
`;

const Input = styled.input`
  width: 80px;
  height: 45px;
  border-radius: 15px;
  border: 1px solid #838383;
  font-size: 18px;
  padding-left: 20px;
  &:focus {
    border: 1px solid #5163d2 !important;
  }
`;

const InputContainer = styled.div`
  > div {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-left: -7%;
`;

const Content = styled.p`
  font-size: 20px;
  color: #787878;
`;

const Button = styled.button`
  width: 520px;
  height: 60px;
  background-color: #5163d2;
  color: white;
  border: none;
  font-size: 25px;
  border-radius: 15px;
  cursor: pointer;
`;
