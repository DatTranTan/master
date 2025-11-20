import styled, { keyframes } from "styled-components";

// Animation background nodes
const float = keyframes`
  0% { transform: translateY(0) translateX(0);}
  50% { transform: translateY(-10px) translateX(10px);}
  100% { transform: translateY(0) translateX(0);}
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
`;

export const NetworkBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(#ffffff11 1px, transparent 1px),
    radial-gradient(#ffffff11 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.2;
  animation: ${float} 10s linear infinite;
`;

export const FormContainer = styled.div`
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.95);
  padding: 30px 40px;
  border-radius: 16px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  text-align: center;

  .title {
    margin-bottom: 8px;
    color: #222;
    font-weight: 700;
    font-size: 24px;
    text-transform: uppercase;
  }

  p {
    margin-bottom: 30px;
    color: #555;
    text-transform: uppercase;
  }

  .ant-input {
    border-radius: 8px;
  }

  .ant-input:focus,
  .ant-input:hover {
    border-color: #1890ff;
    box-shadow: 0 0 8px rgba(24, 144, 255, 0.3);
  }

  .ant-btn-primary {
    background: linear-gradient(135deg, #6b73ff, #000dff);
    border: none;
    font-weight: 600;
    border-radius: 8px;
  }

  .ant-btn-primary:hover {
    opacity: 0.9;
  }

  .ant-form-item .ant-form-item-explain-error {
    text-align: left;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    margin: 1.5rem;
  }
`;
