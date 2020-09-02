import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Table } from "react-bootstrap";
import NumberFormat from "react-number-format";
import numeral from "numeral";
import { Container } from "react-bootstrap";

class App extends Component {
  state = {
    datas: [],
    udatas: [],
    sumdatas: [],
    totalmembers: [],
  };

  async componentDidMount() {
    const result = await axios.get(
      "https://wegivmerchantapp.firebaseapp.com/exam/bi-member-day-2020-04-01.json" //ติดอันแรกคือ CORS แก้โดย google chrome extension
    );
    this.setState({ datas: result.data.data.list }); //ติดอันที่ 2 คือ json มีหลาย object ต้อง select array ก่อน fetch (map)

    const obj = [
      ...new Map(
        this.state.datas.map((item) => [JSON.stringify(item), item])
      ).values(),
    ];

    this.setState({ udatas: obj });
    //console.log(this.state.udatas);

    this.setState({ sumdatas: result.data.data.summary });
    //console.log(this.state.sumdatas);

    this.setState({ totalmembers: result.data.data.summarytier[0] });
    console.log(this.state.totalmembers);
  }

  render() {
    //3 ทำ bootstrap //4 ทำ index key //5 คือ filter duplicate data
    return (
      <div>
        <div class="container">
          <table class="table">
            <thead>
              <tr class="row noborder">
                <th class="col-4 textcenter bgorange fontwhite noborder">
                  Total Members : {this.state.totalmembers.total_members}
                </th>
                <th class="col-8 textcenter bggrey noborder">tttt</th>
              </tr>
              <tr class="row noborder">
                <th class="col-4 textcenter bgorange fontwhite noborder">
                  Total Revs.(THB) :{" "}
                  {numeral(this.state.totalmembers.total_amount).format("0 a")}
                </th>
                <th class="col-8 textcenter bggrey noborder">
                  Total Members : {this.state.totalmembers.total_members}
                </th>
              </tr>
              <tr class="row noborder">
                <th class="col-4 textcenter bgorange fontwhite noborder"></th>
                <th class="col-8 textcenter bggrey noborder">
                  Total Revs.(THB) :{" "}
                  {numeral(this.state.totalmembers.total_amount).format("0 a")}
                </th>
              </tr>
            </thead>
          </table>

          <table class="table table-striped table-bordered">
            <thead>
              <tr class="row textcenter">
                <td class="col-2 bggrey">Name</td>
                <td class="col-2 bggrey">ID</td>
                <td class="col-1 bggrey">Tier</td>
                <td class="col-2 bggrey">LTV</td>
                <td class="col-1 bggrey">Total Trans.</td>
                <td class="col-2 bggrey">Total Point</td>
                <td class="col-2 bggrey">Remaining Point</td>
              </tr>
            </thead>

            <tbody>
              {this.state.udatas.map((user, i) => (
                <tr class="row fontgrey" key={`user-${i}`}>
                  <td class="col-2 textleft">{user.customername}</td>

                  <td class="col-2 textcenter">
                    <NumberFormat
                      value={user.customerphone}
                      displayType={"text"}
                      format="### ### ####"
                    />
                  </td>
                  <td class="col-1 textcenter">tttt</td>

                  <NumberFormat
                    value={user.totalamount}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => (
                      <td class="col-2 textright">
                        <div>{value}</div>
                      </td>
                    )}
                  />
                  <td class="col-1 textright">{user.totaltransaction}</td>
                  <NumberFormat
                    value={user.totalreward}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => (
                      <td class="col-2 textright">
                        <div>{value}</div>
                      </td>
                    )}
                  />
                  <NumberFormat
                    value={user.remainingpoint}
                    displayType={"text"}
                    thousandSeparator={true}
                    renderText={(value) => (
                      <td class="col-2 textright">
                        <div>{value}</div>
                      </td>
                    )}
                  />
                </tr>
              ))}
              {/* {console.log(this.state.udatas)} */}
            </tbody>
          </table>

          <table class="table">
            <tr class="row textcenter bgwhite fontorange borderless">
              <th class="col-2">Total</th>
              <th class="col-3" colSpan="2"></th>
              <NumberFormat
                value={this.state.sumdatas.lifetimevalue}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => (
                  <td class="col-2 textright">
                    <div>{value}</div>
                  </td>
                )}
              />
              <td class="col-1 textright">
                {this.state.sumdatas.totaltransaction}
              </td>
              <NumberFormat
                value={this.state.sumdatas.totalpoint}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => (
                  <td class="col-2 textright">
                    <div>{value}</div>
                  </td>
                )}
              />
              <NumberFormat
                value={this.state.sumdatas.remainingpoint}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => (
                  <td class="col-2 textright">
                    <div>{value}</div>
                  </td>
                )}
              />
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
