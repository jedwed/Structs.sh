/**
 * Type definitions used by the visualiser
 */


export interface Node {
    // CSS selector for the node DOM element
    nodeTarget: SVGSVGElement;

    // CSS selector for the arrow DOM element
    pathTarget: SVGPathElement;

    // reference to a left and right node
    left: Node;
    right: Node;

    // the value of the node which is useful for when we do bst operations
    value: number;

    // the x and y coordinate of the node (just used for basic drawing of a bst for now)
    x: number;
    y: number;
}

export interface Animation {
    /**
     * CSS selector for the element that is to be animated. This is what animejs uses to select the animation targets
     *  → Eg. '#my-id' will apply the animations to the DOM element with the id 'my-id'
     *  → Docs: https://animejs.com/documentation/#cssSelector
     */
    targets: string | SVGSVGElement | SVGPathElement | (string | SVGSVGElement | SVGPathElement)[];

    /**
     * Further CSS properties that Anime will recognise.
     *  → Eg. 'opacity: 1' or 'top: 37%'
     *  → Docs: https://animejs.com/documentation/#cssSelector
     */
    [key: string]: any;
}

/* -------------------------------------------------------------------------- */
/*                               Animation Types                              */
/* -------------------------------------------------------------------------- */

// The types of animations that are supported
export type LinkedListOperation = 'append' | 'deleteByIndex';

// Object containing targets and new node so that a new animation can be constructed
export type CreateSequenceInput = AppendNodeInput | DeleteNodeInput;

export interface AppendNodeInput {
    // The new node to be appended
    newNode: Node;

    // Current nodes in the linked list
    nodes: Node[];
}

export interface DeleteNodeInput {
    // Index of the node to be deleted
    index: number;

    // Details about the node to be deleted
    deletedNode: Node;

    // Nodes to be shifted leftwards after deletion
    shiftedNodes: Node[];

    // The node prior to the one that is to be deleted, if it exists
    prevNode: Node;

    // The list of nodes currently on the DOM
    nodes: Node[];
}
