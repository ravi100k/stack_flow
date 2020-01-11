import "./App.scss";
import React from "react";
import { Layout } from "antd";
import MainView from "../Components/Content";
const { Header, Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      next: null,
      previous: null,
      results: [],
      dataSource: [],
      loading: false
    };
  }

  componentDidMount() {
    this.getData();
  }

  onSearchTextChange = text => {
    // fetch(`https://pokeapi.co/api/v2/pokemon/${text}`)
    //   .then(res => res)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => console.log(`Error with message: ${err}`))
    //   .finally(() => this.setState({ loading: false }));
    const dataSource = this.state.results.filter(
      pokemon => pokemon.name.toLowerCase().indexOf(text.toLowerCase()) !== -1
    );
    this.setState({
      dataSource
    });
  };

  getData = (page = 1) => {
    this.setState({ loading: true });
    const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
    fetch(`${BASE_URL}?offset=${page - 1}0&limit=${30}`)
      .then(res => res.json())
      .then(res => {
        this.setState({ ...res, dataSource: res.results });
      })
      .catch(err => console.log(`Error with message: ${err}`))
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    return (
      <div className="App">
        <Layout>
          <Header className="App-header">Pokemon</Header>
          <Content className="App-content">
            <MainView
              data={this.state}
              onSearch={this.onSearchTextChange}
              getPageData={this.getData}
            />
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
