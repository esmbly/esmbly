const traverse = require('@babel/traverse').default;

class FooTransformer {
  constructor(options) {
    this.options = options;
    this.name = 'Foo';
    this.parserPlugins = ['typescript'];
    this.format = {
      files: ['.bar.ts'],
      input: 'TypeScript',
      output: '.bar.ts',
    };
  }

  transform(trees) {
    trees.forEach(tree => {
      traverse(tree.tree, {
        FunctionDeclaration: ({ node }) => {
          if (!node.id) {
            return;
          }
          if (node.id.name === 'foo') {
            node.id.name = 'bar';
          }
        },
      });
      tree.setFormat(this.format.output);
    });
  }

  createFiles(trees, output) {
    return [].concat(
      ...output.map(out => {
        if (!this.format.files.includes(out.format)) {
          return [];
        }
        return trees.map(tree => tree.toFile(out));
      }),
    );
  }
}

module.exports = FooTransformer;
