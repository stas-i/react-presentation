import { take, call, put } from 'redux-saga/effects'
import { CallApi, baseUri } from '../../api/callApi';
import {
    getArticleCommentsSaga, GET_COMMENTS,
    GET_COMMENTS_START, GET_COMMENTS_SUCCESS, GET_COMMENTS_ERROR
} from '../comments';

/**
 * Saga tests
 * */
describe('people saga', () => {
    it('should get Article Comments', () => {
        const action = {
            type: GET_COMMENTS,
            payload: { articleId: 'testArticleId' }
        }

        const generator = getArticleCommentsSaga(action)

        expect(generator.next().value).toEqual(put({
            type: GET_COMMENTS_START,
            payload: { articleId: 'testArticleId' }
        }))

        expect(generator.next().value)
            .toEqual(call(CallApi, `${baseUri}/comments/testArticleId`))

        const receivedData = [{ test: 1 }, { test: 2 }]

        expect(generator.next(receivedData).value).toEqual(put({
            type: GET_COMMENTS_SUCCESS,
            payload: { articleId: 'testArticleId', comments: receivedData }
        }))

        expect(generator.next().done).toBe(true)
    })

    it('should put GET_COMMENTS_ERROR on error in Get Article Comments', () => {
        const action = {
            type: GET_COMMENTS,
            payload: { articleId: 'testArticleId' }
        }

        const generator = getArticleCommentsSaga(action)

        //Enter catch
        generator.next()
        generator.next()

        const error = new Error

        expect(generator.throw(error).value).toEqual(put({
            type: GET_COMMENTS_ERROR,
            payload: {articleId: 'testArticleId', reason: error.toString()}
        }))
    })
});