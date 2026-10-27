import test from 'node:test';
import assert from 'node:assert/strict';
import {parseCalendar,publicRepos} from './refresh.mjs';
const calendar=Array.from({length:365},(_,i)=>{const d=new Date(Date.UTC(2025,0,i+1)).toISOString().slice(0,10);return `<td data-date="${d}" id="d${i}" data-level="${i%5}"></td><tool-tip for="d${i}">${i?i+' contributions':'No contributions'} on date.</tool-tip>`;}).join('');
test('calendar joins tooltip counts and sorts dates',()=>{const d=parseCalendar(calendar);assert.equal(d.length,365);assert.equal(d[0].count,0);assert.equal(d.at(-1).count,364);});
test('incomplete source fails instead of replacing snapshot with zero',()=>{assert.throws(()=>parseCalendar('Sign in'));assert.throws(()=>parseCalendar(calendar.replace('for="d0"','for="missing"')));assert.throws(()=>parseCalendar(calendar+calendar));});
test('private and unrelated repositories never enter public snapshot',()=>{const result=publicRepos([{name:'visible',private:false,owner:{login:'vineeth-arch'},secret:'never copy'},{name:'private',private:true,owner:{login:'vineeth-arch'}},{name:'other',private:false,owner:{login:'someone'}}]);assert.equal(result.length,1);assert.equal(result[0].name,'visible');assert.equal('secret' in result[0],false);});
