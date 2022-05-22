# Documentation: https://docs.brew.sh/Formula-Cookbook
#                https://rubydoc.brew.sh/Formula
# PLEASE REMOVE ALL GENERATED COMMENTS BEFORE SUBMITTING YOUR PULL REQUEST!
class Swgit < Formula
    version "1.1.3"
    desc "CLI - Easy using git with multiple accounts."
    homepage ""
    url "https://github.com/9bany/git-switch/releases/download/1.1.3/swgit-macos"
    sha256 "8514797c8e4614e44de548d922c8c872fdb7b3e9d930dd567fa30b0fee425f45"
    license "MIT"
  
    # depends_on "cmake" => :build
  
    def install
      # ENV.deparallelize  # if your formula fails when building in parallel
      # Remove unrecognized options if warned by configure
      # https://rubydoc.brew.sh/Formula.html#std_configure_args-instance_method
      
      # system "cmake", "-S", ".", "-B", "build", *std_cmake_args
      bin.install "swgit-macos" => 'swgit'
    end
  
  end