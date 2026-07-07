1/ Students keep asking what they should work on. Agents and big labs' enormous compute make them anxious. My answer for junior video-gen researchers: inference, post-training, and RL. The Together AI number is the clue: tokens jumped ~10,000x in only 9 months (30B/mo -> 400T/mo).

2/ LLMs are a leading indicator for video generation. LLM demand moved from pre-training to post-training/RL, and now increasingly to inference. Video generation is behind that curve, so the underbuilt parts are easier to see.

3/ For inference: LLMs have SGLang and vLLM. Video generation has nothing close yet. Serving video models is still too bespoke, too slow, and too expensive. That is a research opportunity, not just an engineering gap.

4/ For RL: it still barely works in video generation. The longest RL runs in the literature are ~500 steps; our recent work pushes this to 3,000 steps (which we will share later xD). Useful progress, but still far from the scale and maturity of LLM RL.

5/ The bigger gap is infrastructure: RL training systems and inference-serving stacks (also needed for rollout generation) lag far behind LLMs. 

Overall, If you are not rich in GPUs, inference and post-training are very reasonable bets.
