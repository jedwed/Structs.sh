import { bubbleCodeSnippet } from '../util/codeSnippets';
import { getX, getCx } from '../util/helpers';
import GraphicalSortsElement from '../data-structure/GraphicalSortsElement';
import SortsAnimationProducer from './SortsAnimationProducer';

export default class SortsBubbleAnimationProducer extends SortsAnimationProducer {
  public renderBubbleCode() {
    this.renderCode(bubbleCodeSnippet);
  }

  public swap(
    from: GraphicalSortsElement,
    fromIndex: number,
    to: GraphicalSortsElement,
    isLast: boolean
  ) {
    const xFrom = getX(fromIndex);
    const cxFrom = getCx(fromIndex);
    const xTo = getX(fromIndex + 1);
    const cxTo = getCx(fromIndex + 1);

    // Move the two sorting elements
    this.addSequenceAnimation(from.boxTarget.animate().x(xTo));
    this.addSequenceAnimation(from.numberTarget.animate().cx(cxTo));
    this.addSequenceAnimation(to.boxTarget.animate().x(xFrom));
    this.addSequenceAnimation(to.numberTarget.animate().cx(cxFrom));
    this.finishSequence();

    // Unhighlight array items, buffered, performed on next sequence
    this.addSequenceAnimation(to.boxTarget.animate(100).attr({ fill: '#000000' }));
    this.addSequenceAnimation(to.numberTarget.animate(100).attr({ fill: '#000000' }));
    // If a sorting element is the last element of current round, highlight it green
    if (isLast) {
      this.addSequenceAnimation(from.boxTarget.animate(100).attr({ fill: '#39AF8E' }));
      this.addSequenceAnimation(from.numberTarget.animate(100).attr({ fill: '#39AF8E' }));
    }
  }

  public compare(item1: GraphicalSortsElement, item2: GraphicalSortsElement, isLast: boolean) {
    // Highlight the two array items
    this.addSequenceAnimation(item1.boxTarget.animate(100).attr({ fill: '#fc6b03' }));
    this.addSequenceAnimation(item2.boxTarget.animate(100).attr({ fill: '#fc6b03' }));
    this.addSequenceAnimation(item1.numberTarget.animate(100).attr({ fill: '#fc6b03' }));
    this.addSequenceAnimation(item2.numberTarget.animate(100).attr({ fill: '#fc6b03' }));
    // The following animation does nothing: it's simply to pause animation after highlighting
    this.addSequenceAnimation(item1.numberTarget.animate());
    this.finishSequence();

    // Perform highlights if the items being compared don't need to swap
    // The following highlights are buffered, performed on the next sequence
    if (item1.data.value <= item2.data.value) {
      this.addSequenceAnimation(item1.boxTarget.animate(100).attr({ fill: '#000000' }));
      this.addSequenceAnimation(item1.numberTarget.animate(100).attr({ fill: '#000000' }));

      if (isLast) {
        this.addSequenceAnimation(item2.boxTarget.animate(100).attr({ fill: '#39AF8E' }));
        this.addSequenceAnimation(item2.numberTarget.animate(100).attr({ fill: '#39AF8E' }));
      }
    }
  }

  public highlightAllItems(items: GraphicalSortsElement[]) {
    items.forEach((item) => {
      this.addSequenceAnimation(item.boxTarget.animate(100).attr({ fill: '#39AF8E' }));
      this.addSequenceAnimation(item.numberTarget.animate(100).attr({ fill: '#39AF8E' }));
      this.addSequenceAnimation(item.numberTarget.animate());
    });
    this.finishSequence();
  }

  public unhighlightAllItems(items: GraphicalSortsElement[]) {
    items.forEach((item) => {
      this.addSequenceAnimation(item.boxTarget.animate().attr({ fill: '#000000' }));
      this.addSequenceAnimation(item.numberTarget.animate().attr({ fill: '#000000' }));
    });
    this.finishSequence();
  }
}
