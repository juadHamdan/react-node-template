import { Card, Col, Row } from 'antd';
import { UserOutlined, TeamOutlined, ClockCircleOutlined, VideoCameraOutlined  } from '@ant-design/icons';
import React from 'react';

const Cards = ({numOfUsers, numOfMentors, numOfPendign, futureMeetings}) => {
  const cardStyle = { backgroundColor: "#ffcccc", textAlign: "center", width: "250px" , marginLeft: "180px"};
  const cardTitleStyle = { fontSize: "15px" };

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Card bordered={false} style={cardStyle}>
          <UserOutlined style={{ fontSize: "40px" }} />
          <Card.Meta title="Number Of Users" description={<div style={cardTitleStyle}>{numOfUsers}</div>} />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false} style={cardStyle}>
          <TeamOutlined  style={{ fontSize: "40px" }} />
          <Card.Meta title="Number Of Mentors" description={<div style={cardTitleStyle}>{numOfMentors}</div>} />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false} style={cardStyle}>
          <ClockCircleOutlined style={{ fontSize: "40px" }} />
          <Card.Meta title="Number Of Pending" description={<div style={cardTitleStyle}>{numOfPendign}</div>} />
        </Card>
      </Col>
      <Col span={6}>
        <Card bordered={false} style={cardStyle}>
          <VideoCameraOutlined style={{ fontSize: "40px" }} />
          <Card.Meta title="Number Of Meetings" description={<div style={cardTitleStyle}>{futureMeetings.length}</div>} />
        </Card>
      </Col>
    </Row>
  );
};

export default Cards;
