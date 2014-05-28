-module(test).
-export([run/1]).
run(Name)->
    io:format("Hello World ~w~n",[Name]).
