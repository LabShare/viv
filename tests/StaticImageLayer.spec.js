/* eslint-disable import/no-extraneous-dependencies, no-unused-expressions */
import test from 'tape-catch';
import { generateLayerTests, testLayer } from '@deck.gl/test-utils';
import { OrthographicView } from '@deck.gl/core';
import StaticImageLayer from '../src/layers/StaticImageLayer';

test('StaticImageLayer', t => {
  const view = new OrthographicView({
    id: 'ortho',
    controller: true,
    height: 4,
    width: 4,
    target: [2, 2, 0],
    zoom: 0
  });
  const testCases = generateLayerTests({
    Layer: StaticImageLayer,
    assert: t.ok,
    sampleProps: {
      sliderValues: [
        [0, 10],
        [0, 10]
      ],
      colorValues: [
        [0, 1, 1],
        [0, 1, 1]
      ],
      channelIsOn: [true, false],
      loader: {
        getRaster: () => [
          new Uint32Array([0, 2, 1, 2]),
          new Uint32Array([1, 2, 1, 2])
        ],
        vivMetadata: { imageHeight: 2, imageWidth: 2, dtype: '<u4' }
      }
    },
    onBeforeUpdate: ({ testCase }) => t.comment(testCase.title)
  });
  testLayer({
    Layer: StaticImageLayer,
    testCases,
    onError: t.notOkimport,
    viewport: view.makeViewport({
      height: 4,
      width: 4,
      viewState: { target: [2, 2, 0], zoom: 0, width: 4, height: 4 }
    })
  });
  t.end();
});