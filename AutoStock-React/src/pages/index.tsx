import * as React from "react"
import {Link} from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import JSConfetti from 'js-confetti'

const jsConfetti = new JSConfetti()


const IndexPage = () => {

    // confetti();

    return (
        <Layout>
            <Seo title="AutoStock"/>
            <Link to='/CreateAlgorithm'>Create New Algorithm</Link>
            <div></div>
            <Link to='/MyAlgorithm'>My Algorithms</Link>
            <div></div>
            <Link to='/publicAlgorithms'> Public Algorithms</Link>
            <div></div>
        </Layout>
    )
}

// function confetti() {
//     for(var i = 0; i < 1000; i++) {
//         (function(index) {
//             setTimeout(function() {
//                 jsConfetti.addConfetti({
//                     // emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
//                     emojis: ['😂','🍆','📈','👌','💦','🍑','💯'],
//                     // emojiSize: 100,

//                 })
//                 jsConfetti.addConfetti();

//                 }, index*1000);
//         })(i);
//     }
// }


export default IndexPage