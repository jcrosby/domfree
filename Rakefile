require 'jsmin'

task :default => :test

desc 'run test suite'
task :test do
  system('node spec/tacular.js')
end

desc 'prepare files for release'
task :dist do
  FileUtils.rm_rf('dist')
  FileUtils.mkdir('dist')
  FileUtils.cp('domfree.js', 'dist/domfree.js')
  source = File.read('dist/domfree.js')
  File.open('dist/domfree.min.js', 'w') { |io| io.write(JSMin.minify(source)) }
  puts "Complete: the dist directory contains development and minified versions of domfree.\n"
end
