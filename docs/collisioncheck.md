# Collision Check

The collision check is performed from a bubble shot against the play field and the field bubbles.

The play field has a search function that returns the field bubble if there's one at a given position. When a bubble is found, it is then checked for a collision.

The collision check is performed a frame ahead of time, so if the next frame there's a collision, instead of showing the overlapping bubble, it is instead, attached to the correct position and then searched for a match to destroy it.

If the collision happens at the center of a bubble, the bubble shoot is attached to the left of field bubble if there's room to the left, if not, it is attached to its right.

Depending on the horizontal direction of the bubble shoot, the collision check will search for two or three bubble, two at the top and one to the left or right or the leftmost or rightmost bubble respectively.