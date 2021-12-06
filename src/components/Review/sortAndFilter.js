import React, { Component } from "react";
import Section from "hometown-components-dev/lib/SectionHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";

const styles = require("./index.scss");

export default class SortAndFilter extends Component {
  constructor(props) {
    super(props);
  }
  onChangeFilter = e => {
    console.log(e.target.value);
    this.props.applyFilter(e.target.value);
  };
  onChangeSort = e => {
    console.log(e.target.value);
    this.props.applySort(e.target.value);
  };
  render() {
    const { filterValue, sortValue } = this.props;
    return (
      <Section className={styles.filterAndSort} mb="0" pl="0px" pr="0px">
        <Div
          style={{
            display: "flex",
            alignItems: "center",
            width: filterValue ? "22%" : "12%"
          }}
        >
          <select
            onChange={this.onChangeFilter}
            placeholder="FILTER BY"
            style={{
              width: "93%",
              height: "50px",
              border: "none",
              fontSize: "20px",
              fontWeight: 600,
              color: "#323131",
              marginBottom: "10px",
              outline: "none",
              backgroundColor: "#F5F7FA",
              cursor: "pointer"
            }}
            value={filterValue}
          >
            <option value="" disabled selected>
              FILTER BY
            </option>
            {[
              { name: "1 Star", id: "1" },
              { name: "2 Star", id: "2" },
              { name: "3 Star", id: "3" },
              { name: "4 Star", id: "4" },
              { name: "5 Star", id: "5" }
            ].map(val => (
              <option key={val} value={val.id}>
                {val.name}
              </option>
            ))}
          </select>
          {filterValue && (
            <span
              style={{
                color: "#F47020",
                fontSize: "16px",
                marginLeft: "20%",
                whiteSpace: "nowrap",
                cursor: "pointer",
                marginBottom: "5px"
              }}
              onClick={() => this.props.applyFilter("")}
            >
              CLEAR FILTERS
            </span>
          )}
        </Div>
        <Div
          style={{
            display: "flex",
            alignItems: "center",
            width: sortValue ? "27%" : "13%",
            justifyContent: "end"
          }}
        >
          {sortValue && (
            <span
              style={{
                color: "#F47020",
                fontSize: "16px",
                marginRight: "20%",
                whiteSpace: "nowrap",
                cursor: "pointer",
                marginBottom: "5px",
                justifyContent
              }}
              onClick={() => this.props.applySort("")}
            >
              CLEAR SORT
            </span>
          )}
          <select
            onChange={this.onChangeSort}
            placeholder="Sort By"
            style={{
              width: "70%",
              height: "50px",
              border: "none",
              fontSize: "20px",
              color: "#323131",
              marginBottom: "10px",
              fontWeight: 600,
              outline: "none",
              backgroundColor: "#F5F7FA",
              cursor: "pointer"
            }}
            value={sortValue}
          >
            <option value="" disabled selected>
              Sort By
            </option>
            {[
              { name: "Newest First", id: "Newest" },
              { name: "Oldest First", id: "Oldest" },
              { name: "Popular", id: "Popular" }
            ].map(val => (
              <option key={val} value={val.id}>
                {val.name}
              </option>
            ))}
          </select>
        </Div>
      </Section>
    );
  }
}
