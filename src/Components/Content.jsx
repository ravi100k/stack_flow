import "./Content.scss";
import React from "react";
import { List, Card, Input, Modal } from "antd";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      openModal: false
    };
  }

  componentDidMount() {}

  handleClick = value => {
    this.setState({ loading: true });
    fetch(value.url)
      .then(res => res.json())
      .then(res => this.setState({ ...res, openModal: true, loading: false }))
      .catch(err => console.log(err));
  };

  handleOk = e => {
    this.setState({
      openModal: false
    });
  };

  handleCancel = e => {
    this.setState({
      openModal: false
    });
  };

  render() {
    return (
      <div className="mainView">
        <Input.Search
          placeholder="Find Your Pokemon ..."
          enterButton="Search"
          size="large"
          className="searchBox"
          onSearch={value => this.props.onSearch(value)}
        />
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 5,
            xl: 6,
            xxl: 3
          }}
          loading={this.props.data.loading || this.state.loading}
          pagination={{
            size: "small",
            pageSize: 30,
            showQuickJumper: true,
            total: this.props.data.count,
            onChange: this.props.getPageData
          }}
          dataSource={this.props.data.dataSource}
          renderItem={item =>
            <List.Item>
              <Card onClick={() => this.handleClick(item)}>
                <span className="App-link">
                  {item.name}
                </span>
              </Card>
            </List.Item>}
        />
        <Modal
          title={this.state.name}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          visible={this.state.openModal}
        >
          {this.state.sprites && this.state.sprites.front_default
            ? <img
                src={this.state.sprites.front_default}
                alt={this.state.name}
              />
            : "Loading..."}
        </Modal>
      </div>
    );
  }
}

export default Content;
