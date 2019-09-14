import React from "react";

import { List, Avatar, Icon } from "antd";
import Cookies from "universal-cookie";

import Likebtn from "./Like";

const cookies = new Cookies();
const jwt_access = cookies.get("jwt_access");
const Games = props => {
  const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          console.log("Inside game class", props);
        },
        pageSize: 5
      }}
      dataSource={props.data}
      footer={
        <div>
          <b>ant design</b> footer part
        </div>
      }
      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[
            <IconText type="star-o" text="156" />,
            <IconText type="like-o" text="156" />,
            <IconText type="message" text="2" />
          ]}
          extra={<img width={272} alt="logo" src={item.img} />}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={item.href}>{item.title}</a>}
            description={item.price}
          />
          {item.published}
          {jwt_access ? (
            <Likebtn
              onClick={props.onClick}
              currentItem={item.title}
              favorites={props.favorites}
            />
          ) : null}
        </List.Item>
      )}
    />
  );
};

export default Games;
