import React, { Component } from "react";
import { connect } from "react-redux";
import TopBanner from "./TopBanner";
// import Image from "hometown-components-dev/lib/ImageHtV1";
import Div from "hometown-components-dev/lib/BoxHtV1";
import Categories from "./Categories";
import Signup from "./Signup";
import Collection from "./Collection";
import Marquee from "./Marquee";
import ParentsPick from "./ParentsPick";
import WeBuilt from "./WeBuilt";
// import { Link } from "react-router-dom";

@connect(({ smartsters }) => ({
    smartsters,
    topBanner: smartsters.data.items.text.topBanner,
    signup: smartsters.data.items.text.signup,
    collection: smartsters.data.items.text.collection,
    categories: smartsters.data.items.text.categories,
    parentsPick: smartsters.data.items.text.parentsPick,
    weBuilt: smartsters.data.items.text.weBuilt
}))

class SmartstersContainer extends React.Component {
    render() {
        const { topBanner, collection, parentsPick, categories, weBuilt, signup } = this.props;

        return (
            <Div style={{ maxWidth: "1440px", margin: "0 auto" }}>
                <TopBanner topBanner={topBanner} />
                <Categories data={categories.values} />
                <Signup signup={signup} />
                <Marquee />
                <Collection collection={collection} />
                <div>
                    <ParentsPick
                        categoryName="Parents Pick"
                        colSize="20%"
                        id={1}
                        data={parentsPick.values}
                    />
                </div>
                <WeBuilt weBuilt={weBuilt} />
            </Div>
        );
    }
}

export default SmartstersContainer;
