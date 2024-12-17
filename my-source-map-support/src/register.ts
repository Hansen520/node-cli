/*
 * @Date: 2024-12-02 17:15:20
 * @Description: description
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SourceMapConsumer } from 'source-map';

Error.prepareStackTrace = (error, stack) => {
    const name = error.name || 'Error';
    const message = error.message || '';
    const errorString = name + ": " + message;
  
    const processedStack = [];
    for (let i = stack.length - 1; i >= 0; i--) {
      processedStack.push('\n    atHat ' + wrapCallSite(stack[i]));
    }

    return errorString + processedStack.reverse().join('');
}

// 获取一些行列号，然后包装成新的 CallSite 对象
function wrapCallSite(frame: NodeJS.CallSite) {
    const source = frame.getFileName();

    if (source) {
        let position: Record<string, any> | null = {
            source: frame.getFileName(),
            line: frame.getLineNumber(),
            column: frame.getColumnNumber()
        }
        if(source.startsWith('file:/')) {
            position = mapSourcePosition(source, frame.getLineNumber()!, frame.getColumnNumber()!);
        }


        const newFrame: Record<string, any> = {};
        newFrame.getFunctionName = function() {
            return frame.getFunctionName();
        };
        newFrame.getFileName = function() { return position?.source || '' };
        newFrame.getLineNumber = function() { return position?.line || 0; };
        newFrame.getColumnNumber = function() { return position?.column || 0;};
        newFrame.toString = function() {
            return this.getFunctionName() 
                + ' (' + this.getFileName() 
                + ':' + this.getLineNumber() 
                + ':' + this.getColumnNumber()
                + ')'
        }
        return newFrame;
    }
}

function retrieveSourceMapURL(source: string) {
    const fileData = fs.readFileSync(source, { encoding: 'utf-8' });

    const regex = /# sourceMappingURL=(.*)$/g;
    let lastMatch, match;
    // console.log(regex.exec(fileData), 61);
    while (match = regex.exec(fileData)) {
        lastMatch = match;
    }

    if (!lastMatch) return null;
    return lastMatch[1];
}

function mapSourcePosition(source: string, line: number, column: number) {
    if (source.startsWith('file:/')) {
        source = fileURLToPath(source); // 将 文件转路径
    }
    if (!fs.existsSync(source)) {
        return null;
    }

    const sourceMapUrl = retrieveSourceMapURL(source);

    if (sourceMapUrl) {
        const dir = path.dirname(source);
        const sourceMapPath = path.join(dir, sourceMapUrl);

        if (fs.existsSync(sourceMapPath)) {
            const mapContent = fs.readFileSync(sourceMapPath, { encoding: 'utf-8' });
            const map = new SourceMapConsumer(mapContent as any);

            const position = map.originalPositionFor({
                
                line,
                column
            });
            // console.log(position.source, 93);
            return {
                source: path.join(dir, position.source),
                line: position.line,
                column: position.column
            }
        }
    }

    return null;
}
