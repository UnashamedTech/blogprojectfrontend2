'use server';
import apiCall from './api';

class ApiRequest {
  // Constructor to initialize URL and tag
  constructor(
    private url: string,
    private tag: string,
    private data?: unknown,
    private method: string = 'GET'
  ) {}

  // This method will execute the API call
  protected async executeRequest() {
    try {
      const response = await apiCall({
        url: this.url,
        method: this.method,
        data: this.data,
        tag: this.tag,
      });
      return response; // Returning the API response
    } catch (error) {
      throw error;
    }
  }
}

// GET request subclass
class GetRequest extends ApiRequest {
  constructor(url: string, tag: string) {
    super(url, tag, undefined, 'GET');
  }

  public async getData() {
    return this.executeRequest();
  }
}

// POST request subclass
class PostRequest extends ApiRequest {
  constructor(url: string, tag: string, data?: unknown) {
    super(url, tag, data, 'POST');
  }

  public async postData() {
    return this.executeRequest();
  }
}

// PUT request subclass
class PatchRequest extends ApiRequest {
  constructor(url: string, tag: string, data: unknown) {
    super(url, tag, data, 'PATCH');
  }

  public async patchData() {
    return this.executeRequest();
  }
}

// DELETE request subclass
class DeleteRequest extends ApiRequest {
  constructor(url: string, tag: string) {
    super(url, tag, undefined, 'DELETE');
  }

  public async deleteData() {
    return this.executeRequest();
  }
}

export { GetRequest, PostRequest, PatchRequest, DeleteRequest };
