# segment-fullstack-node
This is a basic skeleton of what a successful segment &lt;> optimizely fullstack server-side implementation might look like

# take aways

1) Can I maintain user identity from Segment to Optimizely Full Stack?

Yes, as a best practice you can create a user object/dictionary where Segment and Optimizely can read the user data. (Example in *server.js* file)

2) Can I activate an experiment with a Segment userId?

Yes

3) Can I pass Segment traits as attributes to the experiment and the conversion event in Full Stack?

Yes

4) Can I send offline batched events through Segment that will arrive as conversion events in my Results page?

Yes, use the Segment [HTTP api](https://segment.com/docs/sources/server/http/)
