local lock_key = 'client_state_lock'

local aquire = function()
    if redis.call('setnx', lock_key, 'locked') == 1 then
        redis.call('pexpire', lock_key, 60)
        return 'OK';
    end
end

local release = function()
    if lock then
        redis.call('del', lock_key)
        return 'OK'
    end
end

if KEYS[1] == 'acquire' then return aquire()
elseif KEYS[1] == 'release' then return release()
end
