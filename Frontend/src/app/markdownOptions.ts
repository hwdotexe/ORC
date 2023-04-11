import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.blockquote = (text: string) => {
    return '<blockquote class="mdBlockquote">' + text + '</blockquote>';
  };

  renderer.heading = (text: string, level: number) => {
    return '<h' + level + ' class="mdHeading' + level + '">' + text + '</h' + level + '>';
  };

  renderer.list = (body: string, ordered: boolean) => {
    if (ordered) {
      return '<ol class="mdOL">' + body + '</ol>';
    } else {
      return '<ul class="mdUL">' + body + '</ul>';
    }
  };

  renderer.listitem = (text: string) => {
    return '<li class="mdListItem">' + text + '</li>';
  };

  renderer.hr = () => {
    return '<hr class="mdHr">';
  };

  renderer.link = (href: string, title: string, text: string) => {
    return '<a class="mdA" href="' + href + '" target="_blank" ' + (title ? 'title="' + title + '"' : '') + '>' + text + '</a>';
  };

  renderer.image = (href: string, title: string, text: string) => {
    return '<img class="mdImg" src="' + href + '" ' + (title ? 'title="' + title + '"' : '') + (text ? 'alt="' + text + '"' : '') + '>';
  };

  renderer.codespan = (text: string) => {
    return '<code class="mdCode">' + text + '</code>';
  };

  renderer.code = (code: string) => {
    return '<pre class="mdCodespan"><code>' + code + '</code></pre>';
  };

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false
  };
}
