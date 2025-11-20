import { useEffect, useState } from "react";
import { Button, Card, Radio, Spin, Result, Select, Typography } from "antd";
import * as SC from "./styled";

import {
  NextItemResponse,
  StartTestResponse,
  StopTestResponse,
} from "../../types";
import Api from "../../api";

const { Title, Text } = Typography;

export const Dashboard = () => {
  // UI states
  const [subject, setSubject] = useState<string>("CSDL");
  const [sessionId, setSessionId] = useState<number | null>(null);

  const [question, setQuestion] = useState<NextItemResponse | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [result, setResult] = useState<StopTestResponse | null>(null);

  // ----------------------------------------------------------------
  // 1. Start Test
  // ----------------------------------------------------------------
  const handleStartTest = async () => {
    try {
      setLoading(true);
      const res: StartTestResponse = await Api.startTest(subject);

      setSessionId(res.session_id);

      // load first question
      const firstQ: NextItemResponse = await Api.getNextItem(
        res.session_id,
        null
      );
      setQuestion(firstQ);
    } catch (error) {
      console.error("Start test failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------------------
  // 2. Submit answer → next question
  // ----------------------------------------------------------------
  const handleSubmitAnswer = async () => {
    if (!sessionId) return;
    if (selectedAnswer === null) return;

    try {
      setLoading(true);

      const nextQ: NextItemResponse = await Api.getNextItem(
        sessionId,
        selectedAnswer
      );

      // Nếu server không trả câu mới → đã kết thúc
      if (!nextQ || (nextQ as any)?.done) {
        await handleFinishTest();
        return;
      }

      setQuestion(nextQ);
      setSelectedAnswer(null);
    } catch (error: any) {
      if (error?.response?.status === 410) {
        await handleFinishTest();
      }
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------------------
  // 3. Stop test and get result
  // ----------------------------------------------------------------
  const handleFinishTest = async () => {
    if (!sessionId) return;

    try {
      setLoading(true);

      const res: StopTestResponse = await Api.stopTest(sessionId);
      setResult(res);
      setIsFinished(true);
    } catch (error) {
      console.error("Stop test error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setSessionId(null);
    setQuestion(null);
    setSelectedAnswer(null);
    setIsFinished(false);
    setResult(null);
  };

  // ----------------------------------------------------------------
  // --------------------------- UI -------------------------------
  // ----------------------------------------------------------------

  // UI: Start menu
  if (!sessionId && !isFinished) {
    return (
      <SC.Wrapper>
        <Card style={{ width: 420 }}>
          <Title level={3}>Bắt đầu bài kiểm tra</Title>

          <Text strong>Chọn môn:</Text>
          <Select
            value={subject}
            onChange={setSubject}
            style={{ width: "100%", marginTop: 8, marginBottom: 16 }}
            options={[
              { value: "CSDL", label: "Cơ sở dữ liệu" },
              { value: "Toan roi rac", label: "Toán rời rạc" },
            ]}
          />

          <Button
            type="primary"
            block
            size="large"
            onClick={handleStartTest}
            loading={loading}
          >
            Bắt đầu làm bài
          </Button>
        </Card>
      </SC.Wrapper>
    );
  }

  // UI: Loading
  if (loading && !isFinished) {
    return (
      <SC.Wrapper>
        <Spin size="large" />
      </SC.Wrapper>
    );
  }

  // UI: Question view
  if (sessionId && !isFinished && question) {
    return (
      <SC.Wrapper>
        <Card
          style={{
            maxWidth: 720,
            width: "100%",
            paddingLeft: 50,
            paddingRight: 50,
            paddingBottom: 30,
          }}
        >
          <Title level={4}>Câu hỏi</Title>

          <p style={{ fontSize: 18, fontWeight: 500 }}>{question.content}</p>

          <Radio.Group
            onChange={(e) => setSelectedAnswer(e.target.value)}
            value={selectedAnswer}
            style={{ width: "100%" }}
          >
            {question.choices.map((choice, index) => (
              <Card
                key={index}
                style={{
                  marginTop: 10,
                  padding: 10,
                  paddingBottom: 10,
                  paddingTop: 10,
                  cursor: "pointer",
                  border:
                    selectedAnswer === index
                      ? "2px solid #1677ff"
                      : "1px solid #ddd",
                }}
                onClick={() => setSelectedAnswer(index)}
              >
                <Radio value={index}>{choice}</Radio>
              </Card>
            ))}
          </Radio.Group>

          <Button
            type="primary"
            block
            disabled={selectedAnswer === null}
            onClick={handleSubmitAnswer}
            style={{ marginTop: 24 }}
          >
            Xác nhận
          </Button>
        </Card>
      </SC.Wrapper>
    );
  }

  // UI: Final result
  if (isFinished && result) {
    return (
      <SC.Wrapper>
        <Result
          status="success"
          title="Hoàn thành bài kiểm tra!"
          subTitle={`Điểm: ${
            result.score_percentage
          }% | Theta: ${result.final_theta.toFixed(2)}`}
          extra={[
            <Button type="primary" key="restart" onClick={handleRestart}>
              Làm lại bài mới
            </Button>,
          ]}
        />
      </SC.Wrapper>
    );
  }

  return <SC.Wrapper />;
};
