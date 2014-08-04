/*global describe, it, beforeEach */
/*jshint expr:true */

'use strict';

var fs = require('fs')
  , cheerio = require('cheerio');

var expect = require('chai').expect
  , packerator = require('../');

var testFile = __dirname + '/fixtures/foo.html'
  , testHtml = fs.readFileSync(testFile).toString()
  , barjs = fs.readFileSync(__dirname + '/fixtures/bar.js').toString().trim()
  , barcss = fs.readFileSync(__dirname + '/fixtures/bar.css').toString().trim();

describe('packerator', function() {

  var $, err, packedHtml;

  beforeEach(function(done) {
    packerator(testHtml, {cwd: __dirname + '/fixtures'}, function(e, html) {
      err = e;
      packedHtml = html;
      $ = cheerio.load(packedHtml);
      done();
    });
  });

  it('should not generate an error', function() {
    expect(err).to.not.be.ok;
    expect(packedHtml).to.be.ok;
  });

  it('should remove src attributes from scripts', function() {
    expect($('#script-local').attr('src')).to.not.be.ok;
  });

  it('should inline local JavaScript sources', function() {
    var actual = $('#script-local').html().trim();
    expect(actual).to.equal(barjs);
  });

  it.skip('should inline remote JavaScript sources', function() {
    expect(false).to.be.ok;
  });

  it('should inline local stylesheets', function() {
    var actual = $('#style-local').html().trim();
    expect(actual).to.equal(barcss);
  });

  it('should not leave href attributes on style tags', function() {
    expect($('#style-local').attr('href')).to.not.be.ok;
  });

  it('should not leave rel attributes on style tags', function() {
    expect($('#style-local').attr('rel')).to.not.be.ok;
  });

  it.skip('should inline remote stylesheets', function() {
    expect(false).to.be.ok;
  });

  it.skip('should datauri-ify local images', function() {
    expect(false).to.be.ok;
  });

  it.skip('should datauri-ify remote images', function() {
    expect(false).to.be.ok;
  });

  it.skip('should datauri-ify images in stylesheets', function() {
    expect(false).to.be.ok;
  });

  it.skip('should datauri-ify images in inline styles', function() {
    expect(false).to.be.ok;
  });

  it.skip('should have a streaming interface', function() {
    expect(false).to.be.ok;
  });

  it.skip('should not generte an error when there is nothing to do', function() {
    expect(false).to.be.ok;
  });

});
