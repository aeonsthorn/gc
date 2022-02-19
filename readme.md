# gc-react

gc-react is a cli tool to <strong>generate react components quickly</strong>. You can use one of the templates or add your own to cut down
on the boilerplate typing time and reduce typos.

<br/>

# Installation

## 1) Install the module

### With npm

<br/>

<code>
$ npm install gc-react
</code>

<br/>
<br/>

### With yarn

<br/>
<code>
$ yarn add gc-react
</code>

<br/>
<br/>

## 2) Add the script to your package.json file

<br/>

<pre>
<code>
// package.json

"scripts":{

    ...
    
    "gc":"gc"

}

</code>
</pre>

<br/>
<br/>

## Note : You can also install the module globally

<br/>
<code>
$ npm install -g gc-react
</code>

<br/>
<br/>

# Usage

#### Make sure to replace 'component_name' with the name of the component you want to create.

<br/>

## With yarn

### In the root of your react project

<br/>
<code>
$ yarn gc create 'component_name'
</code>

<br/>
<br/>

## With npm

### In the root of your react project

<br/>
<code>
$ npm run gc create 'component_name'
</code>
<br/>
<br/>

## Installed globally

<br/>
<code>
$ gc create 'component_name'
</code>

<br/>
<br/>

# Options

#### You can specify options has command line arguments <strong>and/or </strong> by creating a <strong>gc-react.config.json</strong> file at the root of your project.

<br/>

#### Typing <code>--template yourtemplate</code> all the time gets tedious, so you should at least create the file and specify the template.

<br/>

<pre>
<code>
// filename : gc-react.config.json

{
    "template" : 'js-next',
}
</code>
</pre>

<br/>

## --dry-run

### Logs the expected output without writing the files

<br/>

## --quiet

### No console.log describing the execution

<br/>

## --template

### Specify the template to start from. Currently available :

<ul>
    <li>ts-globalScss</li>
    <li>js-nextjs</li>
    <li>ts-nextjs</li>
</ul>

<br/>

### specifying a template with command line argument example:

<br/>

<pre>
<code>
$ gc create navbar --template js-nextjs
</code>
</pre>

### <strong>If you want to add a new template or modify one, contact us and we will gladly add it.</strong>

<br/>

### Otherwise, you can overwrite the default template folder by creating your own at the root of your project.

<br/>

### Given that you have a 'template' folder at the root of your project, the tool will look for a 'template/$customTemplateName' folder instead of using one of the builtin ones

<br/>

<hr/>

## Using a gc-react.config.json file

<pre>
<code>
// filename : gc-react.config.json

{
    "dryRun": boolean,
    "template" : string,
    "quiet: boolean
}

</code>
</pre>
