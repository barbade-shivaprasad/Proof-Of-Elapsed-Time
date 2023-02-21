import React from 'react'
import poet1 from '../resources/poet1a.png'
import poet2 from '../resources/poet2.png'
import poet3 from '../resources/poet3.png'
export const About = () => {
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",margin:"10px",marginTop:"70px"}}>
    <div className="container-landing">
        <div className="topic">
            <div className="topic-data">

            <div className="topic-head">What is Proof of Elapsed Time (PoET)? </div>
            <div className="topic-body">
                <p>
                    <b>PoET is a consensus algorithm used in a permissioned blockchain network to decide mining rights and next block miner. FYI, a permissioned blockchain network</b>
                    requires participants to prove their identity, whether they are allowed to join. Hence, it needs permission (or invitation) to join the decentralized network as a new participant ( or node).
                </p>
                <p>
                The PoET algorithm was developed by Intel Corporation, the processor chip giant, in early 2016. Intel associated with Linux Foundation in the development of <a href="Intel introduced PoET as a time-lottery-based consensus algorithm secured by cryptography. The concept basically motivates the idealogy of giving equal chances of getting a reward like a lottery."> Hyperledger Sawtooth.</a> They aimed to build a highly scalable private blockchain network.  
                </p>
                <p>
                Intel introduced PoET as a <b>time-lottery-based </b>consensus algorithm <b>secured</b> by cryptography. The concept basically motivates the idealogy of giving equal chances of getting a reward like a lottery.
                </p>
            </div>
            </div>
            <div className="topic-img">
            <img src={poet1} alt="" />
            </div>
        </div>
        <div className="topic">
            <div className="topic-data">

            <div className="topic-head">How does the Proof of Elapsed Time (PoET) Algorithm work?</div>
            <div className="topic-body">
                <p>
                   The <b>time-lottery concept allows everyone in the network an equal chance of winning</b>
                   the reward and being able to forge a new block to the network. The PoET controller maintains a stopwatch for each participating node. It ensures their waiting time ended, and now they can forge a new block. When the node wakes up, it submits the block and a cryptographic test to the PoET controller for verification. 
                </p>
                <p>
                A newly proposed block selects if the controller approves the newly proposed block by the first woken up node. Else it gets discarded. And then, the selection process of assigning waiting time starts again.
                </p>
                <p>
                    <b>Let’s break down the process more accurately into steps.</b>
                </p>
                <p>
                    <h4>Selection Process</h4>
                </p>
                <p>
                    <ul>
                        <li>First, each participating node has to share its certificate by Intel Software Guard Extension (SGX), which ensures its validity to generate a new block in the network. After that, they are eligible to get a timer object.</li>
                        <li>
                        The numbers assigned to each node as a timer object (waiting countdown time) by Intel’s random number generation instruction, RAND. It generates difficult to detect random numbers.
                        </li>
                        <li>
                        Now, the time object given to each participating node activates.
                        </li>
                    </ul>
                </p>
            </div>

            </div>
            <div className="topic-img">
                <img src={poet2} alt="" />
            </div>
        </div>
        <div className="topic">
            <div className="topic-data">

            <div className="topic-head">Generation Process</div>
            <div className="topic-body">
                <ul>
                    <li>
                    After the time object ends and the node wakes up, it’s eligible to forge a new block to the network.
                    </li>
                    <li>
                    The active node generates the hash (using a hash function like SHA-256) of its block of transactions and submits it for acceptance. It doesn’t require showing computation work done by the node.
                    </li>
                    <li>
                    Afterward, the update gets flooded to the network.
                    </li>
                </ul>
                Therefore ends the iteration of mining a new block in a permissioned blockchain network using the PoET consensus mechanism.

                <h4 style={{margin:"30px 0px"}}>Benefits of Proof of Elapsed Time (PoET)</h4>
                <p>Following are the advantages of the PoET consensus mechanism:</p>

                <ul>
                    <li>PoET can go up to a million transactions per second.</li>
                    <li>It is highly energy-efficient and easily scalable.</li>
                    <li>PoET is for privately controlled spaces like business organizations.</li>
                    <li>It ensures the same opportunity for network participants with time object and activation.</li>
                    <li>
                    As it’s a permissioned blockchain network, the process of selecting validators ensures network security against cyber attacks.
                    </li>
                </ul>
                <h4 style={{margin:"30px 0px"}}>Limitations of Proof of Elapsed Time (PoET)</h4>
                <p>Following are the disadvantages of the PoET consensus mechanism:</p>
                <ul>
                    <li>PoET is a permissioned and closed network, unlike Bitcoin and Ethereum.</li>
                    <li>The mechanism highly depends on tools by Intel technology which might raise compatibility issues with other tools later. </li>
                </ul>
            </div>
            </div>
            <div className="topic-img">
                <img src={poet3} alt="" />
            </div>
        </div>
       
    </div>
    </div>
  )
}
