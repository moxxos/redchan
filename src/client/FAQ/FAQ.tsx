import React from "react";
import { Container, Col, Row } from "reactstrap"
import { Link } from "react-router";
import styled from "styled-components";

import ContentBox from "../components/ContentBox"
import Logo from "../Home/Logo";
import Footer from "../components/Footer";

const faq_info =
    <p>
        Welcome to Redchan's <b>F</b>requently <b>A</b>sked <b>Q</b>uestions page. After reading the FAQ, be sure to familiarize yourself with the <Link to='/rules'>Rules!</Link>
    </p>

const questions_links =
    <ul>
        <li>
            <strong><a href="#basics">Basics</a></strong>
            <ul>
                <li>
                    <a href="#whatRedchan">What is Redchan?</a>
                    <ul>
                        <li><a href="#howaccess">How do I access the boards?</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#whatbasics">What should I know before I post?</a>
                    <ul>
                        <li><a href="#howpost">How do I post on Redchan?</a></li>
                        <li><a href="#postanon">How do I post anonymously?</a></li>
                        <li><a href="#register">Can I register a username?</a></li>
                        <li><a href="#postimage">Must I post an image?</a></li>
                        <li><a href="#replyimage">Can I reply with an image?</a></li>
                        <li><a href="#quote">How do I quote somebody?</a></li>
                        <li><a href="#spoiler">Can I mark a submission as a
                            spoiler?</a></li>
                        <li><a href="#trip">How do I use a "tripcode"?</a></li>
                        <li><a href="#sectrip">What is a "secure tripcode"?</a></li>
                        <li><a href="#capcode">What is a capcode?</a></li>
                        <li><a href="#sage">What is "sage"?</a></li>
                        <li><a href="#nonoko">How can I be returned to the board index
                            after I post?</a></li>
                        <li><a href="#nonokosage">Can I use nonoko and sage at the
                            same time?</a></li>
                    </ul>
                </li>
                <li><a href="#report">How do I report posts?</a></li>
                <li><a href="#delete">How do I delete my own post(s)?</a></li>
                <li><a href="#bump">Why won't my thread bump?</a></li>
                <li><a href="#worksafe">What does "work safe" mean?</a></li>
                <li><a href="#prunedelete">My post disappeared! Where'd it
                    go?</a></li>
                <li><a href="#archive">Can I retrieve an old post/image?</a></li>
                <li><a href="#usercontact">Can you help me contact a specific
                    user?</a></li>
                <li><a href="#imagesource">How can I find the source of an image?</a></li>
            </ul>
        </li>
        <li>
            <strong><a href="#culture">Culture</a></strong>
            <ul>
                <li><a href="#anonymous">Who is "Anonymous"?</a></li>
                <li><a href="#meme">What is a "meme"?</a></li>
                <li><a href="#get">What are "GETs"?</a></li>
            </ul>
        </li>
        <li>
            <strong><a href="#contribution">Contribution</a></strong>
            <ul>
                <li><a href="#contribwhat">What is considered positive
                    contribution?</a></li>
                <li><a href="#contribwhy">Why is contribution so
                    important?</a></li>
                <li><a href="#contribhow">How can I become a good
                    contributor?</a></li>
                <li><a href="#shitposting">What is "shitposting"?</a></li>
            </ul>
        </li>
        <li>
            <strong><a href="#features">Features</a></strong>
            <ul>
                <li><a href="#sticky">What is a "sticky"?</a></li>
                <li><a href="#blotter">What is the blotter?</a></li>
                <li><a href="#feeds">Where are Redchan's feeds located?</a></li>
                <li><a href="#extension">Does Redchan have an official browser extension?</a></li>
                <li><a href="#farchive">Where is the Redchan Flash
                    archive?</a></li>
                <li>
                    <a href="#trial">What is a trial board?</a>
                    <ul>
                        <li><a href="#addx">Can you add "<em>x</em>" board?</a></li>
                    </ul>
                </li>
            </ul>
        </li>
        <li>
            <strong><a href="#issues">Issues</a></strong>
            <ul>
                <li><a href="#whatcaptcha">What is CAPTCHA?</a></li>
                <li><a href="#whycaptcha">Why does Redchan use CAPTCHA?</a></li>
                <li><a href="#whyspam">Why do I still see spam on the boards?</a></li>
                <li><a href="#whencaptcha">When will CAPTCHA be removed?</a></li>
                <li><a href="#nocaptcha">Is there any way to post without a CAPTCHA?</a></li>
                <li><a href="#xbroken">Why doesn't "x" work
                    properly?</a></li>
                <li><a href="#spampost">Why does Redchan think my post is spam?</a></li>
                <li><a href="#noref">What's this "Redchan.org" image?</a></li>
                <li><a href="#downtime">Where should I go if Redchan is
                    unreachable?</a></li>
                <li><a href="#copyrighted">Will Redchan remove copyrighted material pursuant to the Digital Millennium Copyright Act (DMCA)?</a></li>
            </ul>
        </li>
        <li>
            <strong><a href="#administration">Administration</a></strong>
            <ul>
                <li>
                    <a href="#whooperate">Who operates this website?</a></li>
                <li>
                    <a href="#whoadmin">Who is the administrator?</a></li>
                <li><a href="#contactadmin">How do I contact the
                    administrator?</a></li>
                <li><a href="#whofounder">Who founded Redchan?</a></li>
                <li><a href="#whomod">Who are the moderators?</a></li>
                <li><a href="#whojan">What are "janitors"?</a></li>
                <li><a href="#moderation">I never see proof of moderation! Why?</a></li>
                <li><a href="#volunteer">Can I volunteer to join the team?</a></li>
            </ul>
        </li>
        <li>
            <strong><a href="#banishment">Banishment</a></strong>
            <ul>
                <li>
                    <a href="#banknow">How do I know if I am banned?</a>
                    <ul>
                        <li><a href="#banappeal">Can I appeal my ban?</a></li>
                    </ul>
                </li>
                <li><a href="#tempblock">Why am I temporarily blocked from posting?</a></li>
                <li><a href="#blocked">Which ISPs/countries are blocked?</a></li>
            </ul>
        </li>
        <li>
            <strong><a href="#technical">Technical</a></strong>
            <ul>
                <li><a href="#software">What software does Redchan use?</a></li>
                <li><a href="#hardware">What hardware does Redchan run on?</a></li>
                <li><a href="#personalinfo">What personal information is
                    collected?</a></li>
                <li><a href="#torproxy">What is your Tor/proxy policy?</a></li>
            </ul>
        </li>
        <li>
            <strong><a href="#donations">Donations</a></strong>
            <ul>
                <li><a href="#howdonate">How do I donate?</a></li>
                <li><a href="#keeprun">What keeps Redchan running
                    smoothly?</a></li>
                <li><a href="#hardwaredonate">Do you accept alternative
                    donations?</a></li>
            </ul>
        </li>
        <li>
            <strong><a href="#events">Events</a></strong>
            <ul>
                <li>
                    <a href="#holdevent">Where does Redchan hold events?</a>
                    <ul>
                        <li><a href="#ownpanel">Can I host my own Redchan
                            panel?</a></li>
                    </ul>
                </li>
            </ul>
        </li>
        <li>
            <strong><a href="#about">About</a></strong>
            <ul>
                <li><a href="#open">When did Redchan open?</a></li>
                <li><a href="#start">How did it all start?</a></li>
                <li><a href="#were">What were Redchannel and world4ch?</a></li>
                <li><a href="#sponsor">Does Redchan sponsor third-party
                    projects?</a></li>
            </ul>
        </li>
    </ul>


const DTStyled = styled.dt`
    color: #000066;
    padding-left: 1rem;
    margin-block: .5rem;
`

const DDStyled = styled.dd`
    border-bottom: 1px solid #000066;
    margin-inline: 2rem;
    margin-bottom: 1rem;
`

const PStyled = styled.p`
    padding-inline: 0rem;
`

const basics =
    <dl>
        <DTStyled className="first" id="whatRedchan">What is Redchan?</DTStyled>
        <DDStyled>
            <PStyled>Redchan is a simple image-based bulletin board where anyone can
                post comments and share images. Redchan's collaborative-community format
                was inspired by one of the most popular forums in Japan, Futaba Channel.
                Different boards are dedicated to different topics, from Japanese anime,
                manga, and culture to videogames, music, and photography. Users do not
                need to register an account before participating in the community.</PStyled>
        </DDStyled>

        <DTStyled id="howaccess">How do I access the boards?</DTStyled>
        <DDStyled>
            <PStyled>In order to access the full site, you must first read and
                agree to the terms of the disclaimer. To access the disclaimer
                simply click any board and a dialogue will appear. Your response will be
                cookied so you'll only need to do this once (providing you don't clear your
                cache/cookies afterwards). If you wish to browse the site using frames, visit
                /<a href="/frames">frames</a>.</PStyled>
        </DDStyled>

        <DTStyled id="whatbasics">What should I know before I post?</DTStyled>
        <DDStyled>
            <PStyled>Users are encouraged to participate actively in our community,
                but only after they have familiarized themselves with the <a
                    href="/rules">rules</a> and this FAQ. Breaking the rules may
                result in post deletion, a temporary ban, or in some cases,
                permanent banishment. <em>Understand the rules before you begin
                    posting!</em></PStyled>
        </DDStyled>

        <DTStyled id="howpost">How do I post on Redchan?</DTStyled>
        <DDStyled>
            <PStyled>In order to post on Redchan you have to do <u><b>one</b></u> of the following:</PStyled>
            <ul>
                <li>If you are a new user of Redchan (i.e., have never posted before), simply wait for 15 minutes before attempting to post. Click &#039;Get Captcha&#039; then wait for the timer to count down. Consider browsing the board in another tab while you wait.</li>
                <li><a href="https://sys.Redchan.org/signin">Verify your email address</a> to be able to post immediately.</li>
                <li>Have a <a href="https://www.Redchan.org/pass">Redchan Pass</a>.</li>
            </ul>
            <PStyled>
                So for clarity, you do not have to verify your email address if you don&#039;t want to. If you are a new user, you can instead simply wait 15 minutes before posting. Lurk a thread, browse the site, or just come back later. After the wait, you can post threads and replies as normal. Verifying your email address merely bypasses the wait. It will also make your experience smoother by allowing you to bypass various other filters and blocks.<br />
                <br />
                You will need to accept Redchan cookies for any of these methods to work. Please ensure that your browser is not set to block cookies, or that you whitelist Redchan domains in any browser extensions you use which may block cookies. Should you choose to verify your email to bypass the wait, we will not retain long-term records of your email address. After the verification email has been sent, your email address will be purged from our servers.</PStyled>
        </DDStyled>

        <DTStyled id="postanon">How do I post anonymously?</DTStyled>
        <DDStyled>
            <PStyled>To post as "Anonymous", simply do not fill in the [Name] field
                when submitting content. Information such as your personal IP
                address is viewable only to the administrators, and is not made
                publicly available.</PStyled>
        </DDStyled>

        <DTStyled id="register">Can I register a username?</DTStyled>
        <DDStyled>
            <PStyled>No user registration process is available. If you're worried
                about somebody impersonating you, consider using a <a
                    href="#trip">tripcode</a> to help validate your identity.</PStyled>
        </DDStyled>

        <DTStyled id="postimage">Must I post an image?</DTStyled>
        <DDStyled>
            <PStyled>To start a new thread, you must upload an image. Redchan
                <em>is</em> primarily an <strong>image</strong>board after all!
                When replying to an already existing thread, no attachment is
                required.</PStyled>
        </DDStyled>

        <DTStyled id="replyimage">Can I reply with an image?</DTStyled>
        <DDStyled>
            <PStyled>Yes. To reply to a thread with an image of your own, click the
                [Reply] link and fill in the post box as you normally would, making
                sure to specify an image for attachment.</PStyled>
        </DDStyled>

        <DTStyled id="quote">How do I quote somebody?</DTStyled>
        <DDStyled>
            <PStyled>To quote a portion of text, simply place a pointer ("&gt;") in
                front of the text you wish to highlight (ex. "<span
                    style={{ color: '#789922' }}>&gt;This is a quote</span>"). To link to and
                highlight an entire post, place two pointers in front of its unique
                post number (ex. "<span
                    style={{ color: '#000080' }}>&gt;&gt;210981</span>"). Cross-linking to
                another Redchan board is also possible, by placing three pointers
                before a board letter, followed by a post number (ex. "<span
                    style={{ color: '#000080' }}>&gt;&gt;&gt;/x/1208196</span>").</PStyled><br />
            <PStyled>If you're using our <a href="#extension">inline extension</a>, simply
                click the post number you'd like to reference and it will bring up a Quick Reply
                window for you to write your response in. Highlighting text and then clicking the
                post number will quote the selected text.</PStyled>
        </DDStyled>

        <DTStyled id="spoiler">Can I mark a submission as a spoiler?</DTStyled>
        <DDStyled>
            <PStyled>Only certain boards allow you to mask plot-spoiling content. To
                mark your image as a spoiler, check the [x Spoiler Image?] box
                before submission. Spoilerizing text makes it unreadable to others
                until they mouse over it. To spoilerize a comment, place [spoiler]
                tags around the text you wish to hide (ex. "[spoiler]SPIKE
                DIES![/spoiler]"). Misuse of these tags may result in a ban.</PStyled>
        </DDStyled>

        <DTStyled id="trip">How do I use a "tripcode"?</DTStyled>
        <DDStyled>
            <PStyled>Tripcodes can help verify a user's identity to others, and are a
                type of <em>pseudo</em>-registration. To use a normal tripcode,
                place a hash mark ("#") followed by a word or short phrase after
                what you've entered into the [Name] field (ex. "User#password").
                Upon submission, the server will generate the hash unique to that
                particular word or phrase. The previous example would display
                "<span style={{ color: '#000080' }}><strong>User</strong>
                    !ozOtJW9BFA</span>" after being posted.</PStyled><br />
            <PStyled><strong>Important note:</strong> A tripcode is generated only
                using the text entered after the hash mark. Your entered name, IP
                address, cookie information, etc. do not affect the output. Normal
                tripcodes are <em>not</em> secure, and can be cracked with relative ease.
                For a more secure solution, see <a href="#sectrip">secure
                    tripcodes</a>.</PStyled>
        </DDStyled>

        <DTStyled id="sectrip">What is a "secure tripcode"?</DTStyled>
        <DDStyled>
            <PStyled>A <em>secure</em> tripcode can be generated by placing two
                hash marks in the [Name] field, as opposed to one as with a
                <em>normal</em> tripcode (ex. "User##password"). Secure tripcodes
                use a secret key file on the server to help obscure their password.
                The previous example would display "<span
                    style={{ color: '#000080' }}><strong>User</strong> !!rEkSWzi2+mz</span>"
                after being posted.</PStyled>
        </DDStyled>

        <DTStyled id="capcode">What is a capcode?</DTStyled>
        <DDStyled>
            <PStyled>A capcode is a way of verifying someone as a Redchan team member.
                Normal users do not have the ability to post using a capcode. A <a
                    href="#whomod">moderator</a> capcode will display "<span
                        style={{ color: '#800080' }}><strong>## Mod
                        <img src="//s.4cdn.org/image/modicon.gif" alt="Mod Icon" title="This user is a Redchan Moderator." style={{ marginBottom: '-3px' }} /></strong></span>"
                after their name. Similarly, the <a href="#whoadmin">administrator</a> capcode
                displays "<span style={{ color: '#FF0000' }}><strong>## Admin <img src="//s.4cdn.org/image/adminicon.gif" alt="Admin Icon" title="This user is the Redchan Administrator." style={{ marginBottom: '-3px' }} /></strong></span>".
                Often times, a moderator will post as
                "<span style={{ color: '#800080' }}><strong>Anonymous ##
                    Mod <img src="//s.4cdn.org/image/modicon.gif" alt="Mod Icon" title="This user is a Redchan Moderator." style={{ marginBottom: '-3px' }} /></strong></span>" in order to keep their identity secret (which
                is policy). <a href="#whojan">Janitors</a> do not receive a
                capcode.</PStyled><br />
            <PStyled><strong>Note:</strong> Icons will always appear alongside a capcode, and will display a tooltip that says "This user is a/the Redchan Moderator/Administrator" upon mousing over them. If there is no icon/tooltip, the poster is
                an impersonator.</PStyled>
        </DDStyled>

        <DTStyled id="sage">What is "sage"?</DTStyled>
        <DDStyled>
            <PStyled>Entering "sage" (by itself) into the [Options] field while
                replying will cause the thread not to bump to the top of the page.
                Contrary to popular belief, a sage is not a downvote, and should not be used as one. "sage-bombing" or
                announcing that you've saged a thread may result in a ban.</PStyled>
        </DDStyled>

        <DTStyled id="nonoko">How can I be returned to the board index after I post?</DTStyled>
        <DDStyled>
            <PStyled>In August 2012 the default behavior of posting was changed. Upon posting users
                are redirected to their post instead of the board index. To enable the legacy behavior of being
                returned to the board index after posting, enter "nonoko" into the [Options] field.</PStyled>
        </DDStyled>

        <DTStyled id="nonokosage">Can I use nonoko and sage at the same time?</DTStyled>
        <DDStyled>
            <PStyled>Yes, enter "nonokosage" into the [Options] field.</PStyled>
        </DDStyled>

        <DTStyled id="report">How do I report posts?</DTStyled>
        <DDStyled>
            <PStyled>Reporting posts for review is extremely encouraged, as it helps us remove rule breaking and/or illegal content faster. To file a report, click the "&#9654;" button to the right of the post number to expand the post menu, and then select the "Report post" option. A confirmation dialogue will pop up and ask if the post you are reporting is a rule violation, spam, or if it contains illegal material. Be sure to mark this appropriately! Fill out the captcha, and then click on the Submit button.</PStyled><br />
            <PStyled><strong>Important note:</strong> Submitting intentionally false reports may result in a ban. This policy is in place to discourage abuse of the system; it is not meant to dissuade users from submitting legitimate reports.</PStyled>
        </DDStyled>

        <DTStyled id="delete">How do I delete my own post(s)?</DTStyled>
        <DDStyled>
            <PStyled>When you submit a post, a password cookie is automatically set that will
                allow you to delete your post should you choose to. As long as your browser retains this cookie, you
                will be able to delete posts made using it. To delete your post(s), check the box in the upper
                lefthand corner of the specific post(s) you wish to remove, and
                scroll down to the bottom of the page and click the [Delete]
                button on the right. Checking the [x File Only] box will cause only the image to be
                deleted, leaving the comment untouched. Note that some boards and threads
                (ex. stickies) do not allow a user to delete their posts.</PStyled>
        </DDStyled>

        <DTStyled id="bump">Why won't my thread bump?</DTStyled>
        <DDStyled>
            <PStyled>All threads have a set bump limit (varies board to board). When
                this limit is reached, a thread will no longer "bump" to the top of
                the board, causing the thread to descend through the pages until it
                is bumped off of the last page and pruned. This method of post-limiting,
                while sometimes inconvenient, assures that content is kept fresh on
                the boards.</PStyled>
        </DDStyled>

        <DTStyled id="worksafe">What does "work safe" mean?</DTStyled>
        <DDStyled>
            <PStyled>"Work safe" is defined as "content that is safe for viewing in
                the average working environment." Boards that default to the Yotsuba B or
                Burichan (blue) theme are to be considered work safe. Posting
                content that is not suitable for this environment may result in a
                ban. The goal behind enforcing this rule is to keep the cleaner
                sections of the site accessible to those in restricted viewing
                situations.</PStyled>
        </DDStyled>

        <DTStyled id="prunedelete">My post disappeared! Where'd it go?</DTStyled>
        <DDStyled>
            <PStyled>Threads expire and are pruned by Redchan's software at a
                relatively high rate. Since most boards are limited to ten
                pages, content is usually available for only a few hours or days before
                it is removed. Most times, the post was probably pruned automatically, however in some cases it
                may have been removed by a moderator or janitor.
                We ask that users refrain from reposting material that they believe
                to have been deleted by the moderators.</PStyled>
        </DDStyled>

        <DTStyled id="archive">Can I retrieve an old post/image?</DTStyled>
        <DDStyled>
            <PStyled>No. Content that has expired is removed from our servers. Please do not contact us requesting
                content that has been pruned, for it is impossible for us to assist
                you. Instead, try placing a request on the /<a
                    href="//boards.Redchan.org/r/" title="Request">r</a>/
                board.</PStyled>
        </DDStyled>

        <DTStyled id="usercontact">Can you help me contact a specific user?</DTStyled>
        <DDStyled>
            <PStyled>No. Unless a user elects to include an e-mail address or other contact information in their
                post, there is no way to contact that user privately. More details regarding our storage of personal
                information can be found <a href="#personalinfo">here</a>.</PStyled>
        </DDStyled>

        <DTStyled id="imagesource">How can I find the source of an image?</DTStyled>
        <DDStyled style={{ border: 'none' }}>
            <PStyled>Google Image Search and iqdb are great resources to identify the source of an image.
                You can access these services using our inline extension by clicking the "&#9654;" button to the right of a post containing an image, and then selecting "Image search". Remember: Posting requests for source information on the boards may get you banned&mdash;use /<a href="//boards.Redchan.org/r/" title="Requests" target="_blank">r</a>/ for all requests.</PStyled>
        </DDStyled>
    </dl>

const culture =
    <dl>
        <DTStyled>Who is "Anonymous"?</DTStyled>
        <DDStyled>
            <p>"Anonymous" is the name assigned to a poster who does not enter
                text in to the [Name] field. Anonymous is not a single person, but
                rather, represents the collective whole of Redchan. He is a god amongst
                men. Anonymous invented the moon, assassinated former President
                David Palmer, and is also harder than the hardest metal known the
                man: diamond. His power level is rumored to be over nine thousand.
                He currently resides with his auntie and uncle in a town called
                Bel-Air (however, he is West Philadelphia born and raised). He does
                not forgive.</p>
        </DDStyled>

        <DTStyled>What is a "meme"?</DTStyled>
        <DDStyled>
            <p>A meme is basically an idea that is easily transferable from one
                mind to another. Think "catchphrases." Memes are created when a
                large group of users come to identify with a particular image or
                slogan. Their continued [mis]use will bring about the destruction
                of the universe.</p>
        </DDStyled>

        <DTStyled>What are "GETs"?</DTStyled>
        <DDStyled style={{ border: 'none' }}>
            <p>"GETs" happen on the approach to significant or unique post
                numbers on a board, usually /<a
                    href="//boards.Redchan.org/b/" title="Random">b</a>/
                (ex. "5MGET", "1234567GET", "7777777GET", etc.). GETs are sought
                after by many, and normally thousands of users will compete
                for one, often posting very quickly in order to better their
                chances of achieving the desired GET number. GETs are no longer
                automatically "<a href="#sticky">stickied</a>." This feature was
                disabled due to some alleging that the moderation team was rigging
                them behind the scenes. That, and because GETs tend to implode on
                themselves within minutes of being posted.</p>
        </DDStyled>
    </dl>

const contribution =
    <dl>
        <DTStyled>What is considered positive contribution?</DTStyled>
        <DDStyled>
            <p>Our definition of "positive contribution" is the submission of
                substantial, helpful, friendly, and humorous posts to the boards,
                along with the uploading of quality images and files. We feel that
                positive contribution should be treated as a way of donating to
                Redchan without actually having to fork over cash.</p>
        </DDStyled>

        <DTStyled>Why is contribution so important?</DTStyled>
        <DDStyled>
            <p>Contribution is important because it is what <em>drives</em>
                this website. If we didn't have a dedicated pool of users who
                frequently contribute, we'd be yet another stagnant run of the mill
                forum. But we aren't. By having an increasing number of diverse and
                quality contributors, Redchan becomes more unique, interesting, and
                enjoyable to use.</p>
        </DDStyled>

        <DTStyled>How can I become a good contributor?</DTStyled>
        <DDStyled>
            <p>It's really quite easy. If you have something to add to a topic:
                reply. If you have an interesting, high quality, neat, rare, etc.
                picture: upload it! Share your mind and image collections with us.
                Don't just leech! Give back to the community which you take from.
                It's a simple and effective way to grow the site. Before
                contributing, make sure you're acquainted with the <a
                    href="/rules">rules</a>.</p>
        </DDStyled>

        <DTStyled>What is "shitposting"?</DTStyled>
        <DDStyled style={{ border: 'none' }}>
            <p>Shitposting is "knowingly contributing low quality, off-topic, or ill intentioned posts."</p>
        </DDStyled>
    </dl>

const features =
    <dl>
        <DTStyled>What is a "sticky"?</DTStyled>
        <DDStyled>
            <p>"Stickied" threads are posts that are stuck (hence
                "sticky/stickied") to the top of a board's index page. A stickied
                thread is denoted by a small thumbtack icon placed next to its post
                number. Threads can only be stuck by moderators, and cannot be
                saged or otherwise unstuck by users. Trolling, sage-bombing, or
                reporting a sticky may result in a ban.</p>
        </DDStyled>

        <DTStyled>What is the blotter?</DTStyled>
        <DDStyled>
            <p>The blotter provides a short brief of recent site developments.
                A full list of blotter updates is available <a href="/blotter">here</a>.</p>
        </DDStyled>

        <DTStyled>Where are Redchan's feeds located?</DTStyled>
        <DDStyled>
            <p>Redchan maintains a number of <a
                href="//en.wikipedia.org/wiki/Atom_%28standard%29">Atom</a>
                &amp; <a href="//en.wikipedia.org/wiki/RSS">RSS</a> feeds,
                which are located at the following URLs:</p><br />
            <p>Image Boards:
                http(s)://boards.Redchan.org/<strong>board</strong>/index.rss
                (RSS)<br />
                Redchan <a href="http://blog.Redchan.org/"
                    title="Redchan Blog">Blog</a>: <a
                        href="http://blog.Redchan.org/rss">RSS</a><br />
                Redchan <a href="/blotter">Blotter</a>: <a href="/blotter?atom">Atom</a></p><br />
            <p>Redchan also has a <a href="https://github.com/Redchan/Redchan-API" target="_blank>">read-only JSON API</a>.</p>
        </DDStyled>

        <DTStyled>Does Redchan have an official browser extension?</DTStyled>
        <DDStyled>
            <p>Yes! As of late 2012, our browser extension is built right into the site. To use it, simply click [Settings]
                in the upper or lower right-hand corner of your screen.</p>
        </DDStyled>

        <DTStyled>Where is the Redchan Flash archive?</DTStyled>
        <DDStyled>
            <p>The Redchan <a href="/flash">Flash archive</a> is a page
                dedicated to the preservation of user-made Redchan related Flash. To
                inquire about making a submission, please contact the <a
                    href="#whoadmin">administrator</a>.</p>
        </DDStyled>

        <DTStyled>What is a trial board?</DTStyled>
        <DDStyled>
            <p>Trial boards are added every now and then to broaden the scope
                of the website. We open new trial boards as resources permit, based
                on requests from the userbase. If a board does not perform well, it
                is removed to make way for others. A board's trial status is
                denoted by its name appearing <em>italicized</em> on the navigation
                menu.</p>
        </DDStyled>

        <DTStyled>Can you add "<em>x</em>" board?</DTStyled>
        <DDStyled style={{ border: 'none' }}>
            <p>Short answer: no. Long answer: maybe. Boards are added only if
                we believe there is enough interest to drive quality traffic to
                them.</p>
        </DDStyled>
    </dl>

const issues =
    <dl>
        <DTStyled>What is CAPTCHA?</DTStyled>
        <DDStyled>
            <p><a href="//en.wikipedia.org/wiki/CAPTCHA" target="_blank">CAPTCHA</a> is an effective means to mitigate
                automated spam and ensure a submission is coming from a real person.</p>
        </DDStyled>
        <DTStyled>Why does Redchan use CAPTCHA?</DTStyled>
        <DDStyled>
            <p>CAPTCHA was implemented on the imageboards to deal with a deluge of automated spam some years ago.
                It has proven effective in reducing the amount of automated spam that appears on the site.</p>
        </DDStyled>
        <DTStyled>Why do I still see spam on the boards?</DTStyled>
        <DDStyled>
            <p>CAPTCHA is not 100% foolproof. Many spammers will pre-fill CAPTCHAs or pay CAPTCHA solving teams
                (actual people to sit around and fill out challenges) to spam manually. Spam that is not caught by CAPTCHA
                should be <a href="#report">reported</a> and it will be removed by the moderation team.</p>
        </DDStyled>
        <DTStyled>When will the CAPTCHA be removed?</DTStyled>
        <DDStyled>
            <p>Unfortunately, CAPTCHA is a permanent addition to the site. Despite its shortcomings, it is extremely
                effective at reducing automated spam and without it the site would be awash with spam.</p>
        </DDStyled>
        <DTStyled>Is there any way to post without a CAPTCHA?</DTStyled>
        <DDStyled>
            <p>Users who purchase a <a href="https://www.Redchan.org/pass" target="_blank">Redchan Pass</a> may post and report posts without typing a CAPTCHA verification.</p>
        </DDStyled>
        <DTStyled>Why doesn't "x" work properly?</DTStyled>
        <DDStyled>
            <p>Here are four common solutions to problems users might experience:</p>
            <ol>
                <li>Enable first &amp; third party cookies.</li>
                <li>Enable JavaScript.</li>
                <li>Don't block HTTP referers.</li>
                <li>Whitelist Redchan.org, Redchannel.org and all of the subdomains.</li>
            </ol>
        </DDStyled>

        <DTStyled>Why does Redchan think my post is spam?</DTStyled>
        <DDStyled>
            <p>If Redchan's servers detect that you have JavaScript and cookies enabled, but not HTTP referers, you will receive the following error when attempting to post:</p><br />
            <p>"Detected JavaScript + cookies + blocked referer. Your post looks like spam this way, so either enable referers or disable JavaScript and cookies."</p><br />
            <p>Follow the instructions given and either enable HTTP referers, or disable JavaScript and cookies. Read <a href="#xbroken">above</a> for more ideas.</p><br />
            <p>In addition, Redchan maintains a list of blocked URLs and keywords that may result in your post being rejected.</p>
        </DDStyled>

        <DTStyled>What's this "Redchan.org" image?</DTStyled>
        <DDStyled>
            <p>If a black and white "Redchan.org"
                <a href="//s.4cdn.org/image/Redchan-leech.png">image</a> is
                being displayed instead of thumbnails, your browser/firewall/proxy is
                blocking the transmission of HTTP referers, which is triggering our anti-leech
                filter. Disable anything that might be blocking your browser's
                referer from being sent to our servers, and refresh the page.</p>
        </DDStyled>

        <DTStyled>Where should I go if Redchan is unreachable?</DTStyled>
        <DDStyled>
            <p>The <a href="http://blog.Redchan.org/"
                title="Redchan Blog">Redchan Blog</a> and <a href="//twitter.com/Redchan" target="_blank">@Redchan Twitter</a> will be available and contain information regarding downtime when the main site is unreachable.</p>
        </DDStyled>

        <DTStyled>Will Redchan remove copyrighted material pursuant to the Digital Millennium Copyright Act (DMCA)?</DTStyled>
        <DDStyled style={{ border: 'none' }}>
            <p>Yes&mdash;please refer to our <a href="/legal#dmca">DMCA Policy</a> for more information regarding our takedown process. Note that only the copyright holder(s) or their authorized representative(s) may issue such a request, under penalty of perjury, using the DMCA takedown process.</p>
        </DDStyled>
    </dl>

const administration =
    <dl>
        <DTStyled>Who operates this website?</DTStyled>
        <DDStyled>
            <p>Lots of people have contributed to Redchan as volunteers
                over the years. Without their support, we wouldn't be where
                we are today. Here's to
                <span style={{ color: '#800080' }}>
                    <strong>Anonymous ## Mod <img src="//s.4cdn.org/image/modicon.gif" alt="Mod Icon" title="This user is a Redchan Moderator." style={{ marginBottom: '-3px' }} /></strong>
                    \('-')c[<em style={{ fontStyle: 'normal', textDecoration: 'underline' }}>~</em>]
                </span>
            </p>
        </DDStyled>

        <DTStyled>Who is the administrator?</DTStyled>
        <DDStyled>
            <p>Hiroyuki Nishimura is the administrator of Redchan.</p>
        </DDStyled>

        <DTStyled>How do I contact the administration?</DTStyled>
        <DDStyled>
            <p>Contact information can be found on our <a
                href="/contact">Contact</a> page.</p>
        </DDStyled>

        <DTStyled>Who founded Redchan?</DTStyled>
        <DDStyled>
            <p>Christopher "moot" Poole founded and served as the founding administrator of Redchan for more than eleven years, from October 2003 until January 2015.</p>
        </DDStyled>

        <DTStyled>Who are the moderators?</DTStyled>
        <DDStyled>
            <p>Moderators are individuals selected to perform general site
                maintenance. They may delete posts globally, ban users, sticky and
                close threads, etc. There is no publicly available list of
                moderators. Since Redchan is primarily an <em>anonymous</em>
                website, the moderators abide by that same mindset.</p>
        </DDStyled>

        <DTStyled>What are "janitors"?</DTStyled>
        <DDStyled>
            <p>"Janitors" are a class between "end user" and "moderator." They
                are given access to the report system and may delete posts on their
                assigned board(s), as well as submit ban requests. Janitors are
                selected via an application, orientation, and testing process.
                Janitors are instructed to not reveal their position to others and
                are to conduct themselves as would be expected of any other user. A
                breach in confidentiality is grounds for immediate expulsion from
                the program.</p>
        </DDStyled>

        <DTStyled>I never see proof of moderation! Why?</DTStyled>
        <DDStyled>
            <p>...Why would you? There is no public record of deletion, and
                since threads are frequently pruned, there is no way of knowing
                which have been removed by the moderation team. The "<span
                    style={{ color: 'red' }}><strong>(USER WAS BANNED FOR THIS
                        POST)</strong></span>" message is optional and only used under
                certain circumstances, so it's not a good indication of how
                frequently users are being banned. Usually when a user is banned,
                their posts are removed because they're in violation of the rules!
                Quite simply, <em>there is no way for an end user to accurately
                    judge the amount of moderation taking place at any given point in
                    time</em>. Rest assured though; the moderators and janitors are
                always working hard to do their best and keep the boards free of
                rule breaking content.</p>
        </DDStyled>

        <DTStyled>Can I volunteer to join the team?</DTStyled>
        <DDStyled style={{ border: 'none' }}>
            <p>Yes and no. Admission to the moderation team is by invite only.
                <em>Period</em>. The janitor program is occasionally opened up to
                new applicants. Watch the global message and blotter for notices
                concerning the application process. If there is no advertised
                janitor recruitment going on, <strong>you're out of luck</strong>.
                Be patient!</p>
        </DDStyled>
    </dl >

const banishment =
    <dl>
        <DTStyled>How do I know if I am banned?</DTStyled>
        <DDStyled>
            <p>If you're banned you will be redirected to
                <strong>https://www.Redchan.org/banned</strong> when trying to
                post on the board(s) you're banned from. If you're getting 403 or
                404 errors, this doesn't necessarily mean you're banned.</p>
        </DDStyled>

        <DTStyled>Can I appeal my ban?</DTStyled>
        <DDStyled>
            <p>Yes. Use the embedded appeal tool on the banned page to appeal your
                ban. <em>Read the entire banned page carefully before disputing your ban</em>.
                Note that some bans require you sit out for a few days before allowing you to appeal the
                ban. If you believe an error has been made, or you are being mistakenly
                affected by a ban meant for somebody else, contact a moderator on IRC at
                <a href="irc://irc.rizon.net/Redchan">#Redchan @ Rizon</a>. Moderators are available to assist users with bans and technical issues on the website. PM a moderator (operators in the channel denoted by @ or % symbols before their name) with all relevant information, including your IP address if banned. Please note: this is a public channel, everything you say here can be logged and repeated elsewhere. Do not release your personal information in the channel!</p>
        </DDStyled>

        <DTStyled>Why am I temporarily blocked from posting?</DTStyled>
        <DDStyled>
            <p>Users are temporarily blocked from posting when there is a pending ban request placed on their IP. This block lasts 15 minutes from the time a janitor submits
                a ban request, and is removed immediately if the request is denied by a moderator. If the request is approved, a regular ban is applied.</p>
        </DDStyled>

        <DTStyled>Which ISPs, IP ranges, and countries are blocked from posting?</DTStyled>
        <DDStyled style={{ border: 'none' }}>
            <p>A number of ISPs, IP ranges, and countries are disallowed from posting due to repeated abuse. These blocks are often temporary and don't always affect the entire site. Please note that posting from proxies or VPNs is not allowed.<br />Redchan Pass users are exempt from these blocks (but <em>not</em> <a href="#banknow">individual bans</a>)&mdash;<a href="https://www.Redchan.org/pass">click here to learn more</a>.</p>
        </DDStyled>
    </dl>

const events =
    <dl>
        <DTStyled>Where does Redchan hold events?</DTStyled>
        <DDStyled>
            <p>Redchan has held official panels at Anime USA (2005),
                Otakon (2005/2006/2007), and Anime Weekend Atlanta (2013). In addition, we've held a few smaller
                meetups at Anime Weekend Atlanta (2005 &amp; 2006), and Anime
                Central (2006). It's likely our <a href="/news?all#113">10th Anniversary Panel</a>
                was our last.</p>
        </DDStyled>

        <DTStyled>Can I host my own Redchan panel?</DTStyled>
        <DDStyled style={{ border: 'none' }}>
            <p>We highly discourage and would prefer our users not host their
                own Redchan panels. If you choose to
                ignore this, please don't tout your panel as "official" and do
                things that would reflect poorly on the site. Notify the <a href="#whoadmin">administrator</a> with
                details before planning your panel.</p>
        </DDStyled>
    </dl>

const about =
    <dl>
        <DTStyled>When did Redchan open?</DTStyled>
        <DDStyled>
            <p>Redchan opened to the public on October 1st, 2003. Actually, it
                opened a few days earlier but had no site structure and wasn't
                using the Redchan domain name, so 10/01/03 (the date of the first
                news post) is the officially recognized birth date.</p>
        </DDStyled>

        <DTStyled>How did it all start?</DTStyled>
        <DDStyled>
            <p>Redchan was started as a project by Christopher "moot" Poole, a user of a small IRC/DC
                community known as Raspberry Heaven, which was [then] composed of
                users from the "Anime Death Tentacle Rape Whorehouse" (ADTRW)
                sub-forum of The Something Awful Forums. The site began as a small
                image dump for those communities that soon spread like wildfire and
                garnered enough traffic and popularity to become its own fully
                fledged community.</p>
        </DDStyled>

        <DTStyled>What were Redchannel and world4ch?</DTStyled>
        <DDStyled>
            <p>Redchannel and world4ch were two sites spun off from Redchan but
                later merged back into the main site. Redchannel was basically "work
                safe Redchan", and world4ch housed our discussion boards.</p>
        </DDStyled>

        <DTStyled>Does Redchan sponsor third-party projects?</DTStyled>
        <DDStyled style={{ border: 'none' }}>
            <p>Redchan generally does not endorse third-party projects. Please do
                not market your project as "official" or "sponsored" by Redchan, or
                use the Redchan name or logo to promote them in any way without first obtaining
                our written permission.</p>
        </DDStyled>
    </dl>


const technical =
    <dl>
        <DTStyled>What software does Redchan use?</DTStyled>
        <DDStyled>
            <p>Redchan runs a proprietary version of
                imageboard software that we refer to internally as "Yotsuba." Currently there are
                no plans to make our code available to the public. Many open source
                alternatives exist though, and are only a search away!</p>
            <p>Redchan includes GeoLite2 data created by MaxMind, available from <a target="_blank" rel="noreferrer" href="//www.maxmind.com">maxmind.com</a>.</p>
        </DDStyled>

        <DTStyled>What hardware does Redchan run on?</DTStyled>
        <DDStyled>
            <p>Redchan is powered by a rack of colocated servers and a CDN (CloudFlare), enabling us to
                serve more than 100 <em>terabytes</em> of data per day, and over 680 million pageviews
                to more than 22 million unique visitors per month!</p>
        </DDStyled>

        <DTStyled>What personal information is collected?</DTStyled>
        <DDStyled>
            <p>Redchan collects and stores user information for postings. Once a post is pruned or deleted, it is removed from our web server. We value the privacy of our users, and will not make private information such as IP addresses available to others, except to comply with court orders or to cooperate with law enforcement agencies when appropriate.</p>
        </DDStyled>

        <DTStyled>What is your Tor/proxy policy?</DTStyled>
        <DDStyled style={{ border: 'none' }}>
            <p>Due to repeated abuse coming from Tor exit nodes and open
                proxies, our official policy is to block them when possible. Our
                apologies for the inconvenience this might cause those who use
                these services for legitimate purposes.</p>
        </DDStyled>
    </dl>

const donations =
    <dl>
        <DTStyled>How do I donate?</DTStyled>
        <DDStyled>
            <p>Redchan has not accepted donations since the fall of 2005, during our
                "<a href="/news?all#79">DONATE OR DIE</a>" fundraiser.
                It is our goal to provide the site free of charge to all users, and to support
                the site through <a href="/news?all#109">advertising revenue and Redchan Passes</a>.
                Purchasing a <a href="https://www.Redchan.org/advertise?selfserve">self-serve ad</a> is an alternative way of supporting the site.</p>
        </DDStyled>

        <DTStyled>What keeps Redchan running smoothly?</DTStyled>
        <DDStyled>
            <p>$CASH MONEY$, and of course our talented team of volunteers!
                You can help support the site by <a href="https://www.Redchan.org/pass" target="_blank">purchasing a Redchan Pass</a>, making sure you have ads unblocked on *.Redchan.org/*", and also by clicking ads relevant to your interests.</p>
        </DDStyled>

        <DTStyled>Do you accept alternative donations?</DTStyled>
        <DDStyled style={{ border: 'none' }}>
            <p>Alternative donations such as computer hardware, bandwidth,
                hosting, et cetera cannot be accepted. Thanks for the offer though!</p>
        </DDStyled>
    </dl>

export default function FAQ() {
    return (
        <Container style={{ maxWidth: '750px' }}>
            <Row>
                <Logo />
            </Row>
            <Row>
                <ContentBox
                    title='Frequently Asked Questions'
                    title_background_color='#ffccaa'
                    title_font_color='#880000'
                    border_color='#880000'
                    content={faq_info} />
            </Row>
            <Row className="g-2" style={{ marginLeft: '-.75rem', marginRight: '-.75rem' }}>
                <Col xs='6' className="ps-0">
                    <ContentBox
                        title='Questions'
                        title_background_color='#99cc66'
                        title_font_color='#006600'
                        border_color='#006600'
                        content_background_color='#eeffee'
                        content={questions_links} />
                </Col>
                <Col xs='6' className="pe-0">
                    <ContentBox
                        title='Basics'
                        title_background_color='#5599aa'
                        title_font_color='#000066'
                        border_color='#000066'
                        content_background_color='#eeffff'
                        content={basics}
                    />
                    <ContentBox
                        title='Culture'
                        title_background_color='#5599aa'
                        title_font_color='#000066'
                        border_color='#000066'
                        content_background_color='#eeffff'
                        content={culture}
                    />
                    <ContentBox
                        title='Contribution'
                        title_background_color='#5599aa'
                        title_font_color='#000066'
                        border_color='#000066'
                        content_background_color='#eeffff'
                        content={contribution}
                    />
                    <ContentBox
                        title='Features'
                        title_background_color='#5599aa'
                        title_font_color='#000066'
                        border_color='#000066'
                        content_background_color='#eeffff'
                        content={features}
                    />
                    <ContentBox
                        title='Issues'
                        title_background_color='#5599aa'
                        title_font_color='#000066'
                        border_color='#000066'
                        content_background_color='#eeffff'
                        content={issues}
                    />
                    <ContentBox
                        title='Administration'
                        title_background_color='#5599aa'
                        title_font_color='#000066'
                        border_color='#000066'
                        content_background_color='#eeffff'
                        content={administration}
                    />
                    <ContentBox
                        title='Banishment'
                        title_background_color='#5599aa'
                        title_font_color='#000066'
                        border_color='#000066'
                        content_background_color='#eeffff'
                        content={banishment}
                    />
                    <ContentBox
                        title='Technical'
                        title_background_color='#5599aa'
                        title_font_color='#000066'
                        border_color='#000066'
                        content_background_color='#eeffff'
                        content={technical}
                    />
                    <ContentBox
                        title='Donations'
                        title_background_color='#5599aa'
                        title_font_color='#000066'
                        border_color='#000066'
                        content_background_color='#eeffff'
                        content={donations}
                    />
                    <ContentBox
                        title='Events'
                        title_background_color='#5599aa'
                        title_font_color='#000066'
                        border_color='#000066'
                        content_background_color='#eeffff'
                        content={events}
                    />
                    <ContentBox
                        title='About'
                        title_background_color='#5599aa'
                        title_font_color='#000066'
                        border_color='#000066'
                        content_background_color='#eeffff'
                        content={about}
                    />
                </Col>
            </Row>
            <Row>
                <Footer />
            </Row>
        </Container>
    )
}