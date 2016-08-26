import { render } from './../rendering';
import { createVTemplateFactory as createVTemplate, createVElement, createVComponent } from './../../core/shapes';
import { createTemplateReducers } from './../../DOM/templates';
import { innerHTML } from '../../tools/utils';

const Inferno = {
	createVTemplate,
	createVElement,
	createVComponent
};
const InfernoDOM = {
	createTemplateReducers
};

describe('Select / select multiple (JSX)', () => {
	let container;

	beforeEach(() => {
		container = document.createElement('div');
	});

	afterEach(() => {
		container.innerHTML = '';
	});

	it('should render "select" boolean on select options with numbers', () => {
		render(<select multiple={ true } value={ null }><option value={ 1 }>1</option><option value={ 2 }>2</option></select>, container);
		render(<select multiple={ true } value={ undefined }><option value={ 1 }>1</option><option value={ 2 }>1</option></select>, container);
		render(<select multiple={ true } value={ 2 }><option value={ 1 }>1</option><option value={ 2 }>2</option></select>, container);

		expect(container.firstChild.children[ 0 ].selected).to.eql(false);
		expect(container.firstChild.children[ 1 ].selected).to.eql(true);
		expect(
			container.innerHTML
		).to.equal(
			innerHTML('<select multiple=""><option value="1">1</option><option value="2">2</option></select>')
		);

		render(<select multiple={ true } value={ 1 }><option value={ 1 }>1</option><option value={ 2 }>2</option></select>, container);

		expect(container.firstChild.children[ 0 ].selected).to.eql(true);
		expect(container.firstChild.children[ 1 ].selected).to.eql(false);
		expect(
			container.innerHTML
		).to.equal(
			innerHTML('<select multiple=""><option value="1">1</option><option value="2">2</option></select>')
		);

		render(<select multiple={ true } value={ 'foo' }><option value={ 1 }>1</option><option value={ 2 }>2</option></select>, container);

		expect(container.firstChild.children[ 0 ].selected).to.eql(false);
		expect(container.firstChild.children[ 1 ].selected).to.eql(false);
		expect(
			container.innerHTML
		).to.equal(
			innerHTML('<select multiple=""><option value="1">1</option><option value="2">2</option></select>')
		);
	});

	it('should render "select" boolean on select options', () => {
		render(<select multiple={ true } value={ {} }><option value='foo'>foo</option><option value='bar'>bar</option></select>, container);
		render(<select multiple={ true } value={ null }><option value='foo'>foo</option><option value='bar'>bar</option></select>, container);
		render(<select multiple={ true } value={ undefined }><option value='foo'>foo</option><option value='bar'>bar</option></select>, container);
		render(<select multiple={ true } value={ 'foo' }><option value='foo'>foo</option><option value='bar'>bar</option></select>, container);
		expect(container.firstChild.children[ 0 ].selected).to.eql(true);
		expect(container.firstChild.children[ 1 ].selected).to.eql(false);
		expect(
			container.innerHTML
		).to.equal(
			innerHTML('<select multiple=""><option value="foo">foo</option><option value="bar">bar</option></select>')
		);
		render(<select multiple={ true } value={ undefined }><option value='foo'>foo</option><option value='bar'>bar</option></select>, container);
		render(<select multiple={ true } value={ null }><option value='foo'>foo</option><option value='bar'>bar</option></select>, container);
		expect(container.firstChild.children[ 0 ].selected).to.eql(false);
		expect(container.firstChild.children[ 1 ].selected).to.eql(false);
		expect(
			container.innerHTML
		).to.equal(
			innerHTML('<select multiple=""><option value="foo">foo</option><option value="bar">bar</option></select>')
		);

		render(<select multiple={ true } value={ 'bar' }><option value='foo'>foo</option><option value='bar'>bar</option></select>, container);
		expect(container.firstChild.children[ 0 ].selected).to.eql(false);
		expect(container.firstChild.children[ 1 ].selected).to.eql(true);
		expect(
			container.innerHTML
		).to.equal(
			innerHTML('<select multiple=""><option value="foo">foo</option><option value="bar">bar</option></select>')
		);
	});

	it('should render "select" boolean on select options', () => {
		render(<select multiple={ true } value={ 'foo' }><option value='foo'>foo</option><option value='bar'>bar</option></select>, container);
		expect(container.firstChild.children[ 0 ].selected).to.eql(true);
		expect(container.firstChild.children[ 1 ].selected).to.eql(false);
		expect(
			container.innerHTML
		).to.equal(
			innerHTML('<select multiple=""><option value="foo">foo</option><option value="bar">bar</option></select>')// Missing selected markup
		);
	});

	/*
	TODO! Do we need to support this kind of shortcuts, shouldn't user mark options as selected or not like in vanilla JS

	it('should populate the value attribute on select multiple using groups', () => {
		const template = (val) => ({
			tag: 'select',
			attrs: {
				multiple: true,
				value: val
			},
			children: [{
				tag: 'optGroup',
				attrs: {
					label: 'foo-group'
				},
				children: {
					tag: 'option',
					attrs: {
						value: 'foo'
					}
				}
			}, {
				tag: 'optGroup',
				attrs: {
					label: 'bar-group'
				},
				children: {
					tag: 'option',
					attrs: {
						value: 'bar'
					}
				}
			}]
		});

		//render(template(undefined), container);
		render(template([ 'foo', 'bar' ]), container);

		expect(container.firstChild.childNodes[ 0 ].innerHTML).to.eql('<option value="foo"></option>');
		expect(container.firstChild.childNodes[ 1 ].innerHTML).to.eql('<option value="bar"></option>');

		expect(container.firstChild.children[ 0 ].children[ 0 ].selected).to.eql(true);
		expect(container.firstChild.children[ 1 ].children[ 0 ].selected).to.eql(true);

		render(template([]), container);

		expect(container.firstChild.childNodes[ 0 ].innerHTML).to.eql('<option value="foo"></option>');
		expect(container.firstChild.childNodes[ 1 ].innerHTML).to.eql('<option value="bar"></option>');

		expect(container.firstChild.children[ 0 ].children[ 0 ].selected).to.eql(false);
		expect(container.firstChild.children[ 1 ].children[ 0 ].selected).to.eql(false);

		render(template('foo'), container);

		expect(container.firstChild.childNodes[ 0 ].innerHTML).to.eql('<option value="foo"></option>');
		expect(container.firstChild.childNodes[ 1 ].innerHTML).to.eql('<option value="bar"></option>');

		expect(container.firstChild.children[ 0 ].children[ 0 ].selected).to.eql(true);
		expect(container.firstChild.children[ 1 ].children[ 0 ].selected).to.eql(false);

		render(template('bar'), container);

		expect(container.firstChild.childNodes[ 0 ].innerHTML).to.eql('<option value="foo"></option>');
		expect(container.firstChild.childNodes[ 1 ].innerHTML).to.eql('<option value="bar"></option>');

		expect(container.firstChild.children[ 0 ].children[ 0 ].selected).to.eql(false);
		expect(container.firstChild.children[ 1 ].children[ 0 ].selected).to.eql(true);

		render(template(null), container);

		expect(container.firstChild.childNodes[ 0 ].innerHTML).to.eql('<option value="foo"></option>');
		expect(container.firstChild.childNodes[ 1 ].innerHTML).to.eql('<option value="bar"></option>');

		expect(container.firstChild.children[ 0 ].children[ 0 ].selected).to.eql(false);
		expect(container.firstChild.children[ 1 ].children[ 0 ].selected).to.eql(false);
	});
*/
	it('should render "select" boolean on select options', () => {

		render(<select multiple={ true } value={ 'foo' }><option value='foo'>foo</option><option value='bar'>bar</option></select>, container);

		expect(container.firstChild.children[ 0 ].selected).to.eql(true);
		expect(container.firstChild.children[ 1 ].selected).to.eql(false);
		expect(
			container.innerHTML
		).to.equal(
			innerHTML('<select multiple=""><option value="foo">foo</option><option value="bar">bar</option></select>')
		);

		render(<select multiple={ true } value={ undefined }><option value='foo'>foo</option><option value='bar'>bar</option></select>, container);

		expect(container.firstChild.children[ 0 ].selected).to.eql(false);
		expect(container.firstChild.children[ 1 ].selected).to.eql(false);
		expect(
			container.innerHTML
		).to.equal(
			innerHTML('<select multiple=""><option value="foo">foo</option><option value="bar">bar</option></select>')
		);

	});

	it('should assure the value attribute also set the value property for `textarea`', () => {
		render(<textarea value={ 'foo' } />, container);
		expect(container.firstChild.value).to.eql('foo');
		render(<textarea value={ 'bar' } />, container);
		expect(container.firstChild.value).to.eql('bar');
		render(<textarea value={ 'bar' } />, container);
		expect(container.firstChild.value).to.eql('bar');
		render(<textarea value={ 'foo' } />, container);
		expect(container.firstChild.value).to.eql('foo');
		render(<textarea value={ null } />, container);
		expect(container.firstChild.value).to.eql('');
		render(<textarea value={ undefined } />, container);
		expect(container.firstChild.value).to.eql('');
		render(<textarea value={ 'bar' } />, container);
		expect(container.firstChild.value).to.eql('bar');
		render(<textarea value={ [] } />, container);
		expect(container.firstChild.value).to.eql('');
		render(<textarea value={ {} } />, container);
		expect(container.firstChild.value).to.eql('[object Object]');
	});

	it('should handle when multiple values passed in as an array', () => {
		render(<select multiple={ true } value={ [ 'a', 'b', 'c' ] }>
			<option value={ 'a' }>a</option>
			<option value={ 'b' }>b</option>
			<option value={ 'c' }>c</option>
			<option value={ 'd' }>d</option>
		</select>, container);

		expect(container.firstChild.children[ 0 ].selected).to.eql(true);
		expect(container.firstChild.children[ 1 ].selected).to.eql(true);
		expect(container.firstChild.children[ 2 ].selected).to.eql(true);
		expect(container.firstChild.children[ 3 ].selected).to.eql(false);
		expect(
			container.innerHTML
		).to.equal(
			innerHTML('<select multiple=""><option value="a">a</option><option value="b">b</option><option value="c">c</option><option value="d">d</option></select>')
		);
	});

	it('should handle when multiple options with selected set', () => {
		const template = () => createElement('select', {
			multiple: true
		}, createElement('option', {
			value: 'a',
			selected: true
		}, 'a'), createElement('option', {
			value: 'b',
			selected: true
		}, 'b'), createElement('option', {
			value: 'c',
			selected: true
		}, 'c'), createElement('option', {
			value: 'd'
		}, 'd'));

		render(<select multiple={ true }>
			<option value='a' selected={ true }>a</option>
			<option value='b' selected={ true }>b</option>
			<option value='c' selected={ true }>c</option>
			<option value='d'>d</option>
		</select>, container);

		expect(container.firstChild.children[ 0 ].selected).to.eql(true);
		expect(container.firstChild.children[ 1 ].selected).to.eql(true);
		expect(container.firstChild.children[ 2 ].selected).to.eql(true);
		expect(container.firstChild.children[ 3 ].selected).to.eql(false);
		expect(
			container.innerHTML
		).to.equal(
			innerHTML('<select multiple=""><option value="a">a</option><option value="b">b</option><option value="c">c</option><option value="d">d</option></select>')
		);
	});
});