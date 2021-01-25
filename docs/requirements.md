# Bubble Shooter Requirements

## Play Field

The play field has a number of rows and columns, a position, the width of the columns, and the height of the rows.

There's two types of rows, one that has a total of columns specified for the field and the other has one column less. The first row will be known as the full row and the second as the shifted row.

The play field can start either in a full row or a shifted row.

Graphically, the bubbles in the rows overlay by a certain height which is typically the width of the column minus the height of row.

Given a position, the play field should be able to tell if there's a bubble in that position or not.

Play fields are loaded from a configuration that specifies the bubbles's positions and their colors.

## Bubbles

### Field Bubbles

The fields bubbles are the static bubbles in the play field. They are of a particular color or type. They are destroyed if they are part of a match or if there's no connected path from it to at least one of the top-most bubbles.

After a match, it is searched if there are bubbles with no path to the top-most bubbles to destroy them.

### Next Bubble

They are static like the bubble in the play field, but the are waiting to be shoot. They only have a color or type to differentiate them.

### Bubble Shoot

It is the bubble that moves with a certain speed inside the field. It only moves up, and either left or right. When it touches the play field sides, it reverses its horizontal direction. If it touches the top of the play field, it is attached as one of the top-most bubbles.

When it touches a bubble in the play field, it is attached and it is searched if there's a match of three of more bubble of the same color or compatible types. If there's is, the bubble is destroyed along the other matches.